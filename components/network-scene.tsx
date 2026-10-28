'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { HUB_COLORS } from '@/lib/scene'

/**
 * Illustrative "people network": soft nodes on a sphere, each linked to one of five trait hubs
 * (the strengths listed on the resume) and to a near neighbour. One hub is highlighted at a time.
 *
 * Events: listens for `net:focus` (detail = hub index), dispatches `net:active` (detail = hub index).
 * `?scene-t=<seconds>` pins the animation for screenshots.
 */

const N = 110
const R = 1.55
const HUBS = 5
const CYCLE = 3.4
const BASE = '#E2DAEF'

function fibonacci(i: number, n: number) {
  const y = 1 - (i / (n - 1)) * 2
  const r = Math.sqrt(1 - y * y)
  const t = Math.PI * (3 - Math.sqrt(5)) * i
  return new THREE.Vector3(Math.cos(t) * r, y, Math.sin(t) * r)
}

export default function NetworkScene({ className }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = host.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch {
      el.dataset.webgl = 'unavailable'
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarse ? 1.5 : 2))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)
    renderer.domElement.setAttribute('aria-hidden', 'true')
    renderer.domElement.style.touchAction = 'pan-y'
    renderer.domElement.style.cursor = 'grab'
    renderer.domElement.style.opacity = '0'
    renderer.domElement.style.transition = 'opacity 0.9s ease'

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50)
    camera.position.set(0, 0, 5.4)
    scene.add(new THREE.HemisphereLight(0xffffff, 0xd9cfe8, 2.2))
    const key = new THREE.DirectionalLight(0xffffff, 1.6)
    key.position.set(2.5, 3, 4)
    scene.add(key)

    const group = new THREE.Group()
    scene.add(group)

    // Nodes and hubs
    const pos: THREE.Vector3[] = []
    for (let i = 0; i < N; i++) {
      const p = fibonacci(i, N).multiplyScalar(R * (0.92 + Math.random() * 0.16))
      pos.push(p)
    }
    const hubIdx = [8, 31, 55, 78, 99]
    const hubOf = pos.map((p, i) => {
      const own = hubIdx.indexOf(i)
      if (own >= 0) return own
      let best = 0
      let d = Infinity
      hubIdx.forEach((h, k) => {
        const dd = p.distanceTo(pos[h])
        if (dd < d) {
          d = dd
          best = k
        }
      })
      return best
    })

    const geo = new THREE.SphereGeometry(1, 20, 14)
    const mat = new THREE.MeshStandardMaterial({ roughness: 0.45, metalness: 0.0 })
    const nodes = new THREE.InstancedMesh(geo, mat, N)
    const base = new THREE.Color(BASE)
    const hubCols = HUB_COLORS.map((c) => new THREE.Color(c))
    const dummy = new THREE.Object3D()
    const scale = new Float32Array(N)
    for (let i = 0; i < N; i++) {
      scale[i] = hubIdx.includes(i) ? 0.19 : 0.04 + Math.random() * 0.025
      nodes.setColorAt(i, base)
    }
    group.add(nodes)

    // Edges: every node to its hub, plus to its nearest non-hub neighbour
    const pairs: [number, number][] = []
    pos.forEach((p, i) => {
      if (!hubIdx.includes(i)) pairs.push([i, hubIdx[hubOf[i]]])
      let best = -1
      let d = Infinity
      pos.forEach((q, j) => {
        if (j === i || hubIdx.includes(j)) return
        const dd = p.distanceTo(q)
        if (dd < d) {
          d = dd
          best = j
        }
      })
      if (best > i) pairs.push([i, best])
    })
    const lineGeo = new THREE.BufferGeometry()
    const lp = new Float32Array(pairs.length * 6)
    const lc = new Float32Array(pairs.length * 6)
    pairs.forEach(([a, b], k) => {
      lp.set([pos[a].x, pos[a].y, pos[a].z, pos[b].x, pos[b].y, pos[b].z], k * 6)
    })
    lineGeo.setAttribute('position', new THREE.BufferAttribute(lp, 3))
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lc, 3))
    const lines = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.85 }))
    group.add(lines)

    const resize = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      renderer.setSize(w, h, false)
      renderer.domElement.style.width = `${w}px`
      renderer.domElement.style.height = `${h}px`
      camera.aspect = w / Math.max(h, 1)
      camera.position.z = w < 520 ? 6.3 : 5.4
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(el)

    const par = { x: 0, y: 0, tx: 0, ty: 0 }
    let drag = false
    let lastX = 0
    let user = 0
    let vel = 0
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') {
        par.tx = (e.clientX / window.innerWidth - 0.5) * 2
        par.ty = (e.clientY / window.innerHeight - 0.5) * 2
      }
      if (drag) {
        vel = (e.clientX - lastX) * 0.006
        lastX = e.clientX
        user += vel
      }
    }
    const onDown = (e: PointerEvent) => {
      drag = true
      lastX = e.clientX
      renderer.domElement.style.cursor = 'grabbing'
    }
    const onUp = () => {
      drag = false
      renderer.domElement.style.cursor = 'grab'
    }
    renderer.domElement.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerup', onUp)

    const pinned = new URLSearchParams(window.location.search).get('scene-t')
    const pinnedT = pinned !== null && Number.isFinite(Number(pinned)) ? Number(pinned) : null
    let t = pinnedT ?? 0
    let manual: number | null = null
    let manualUntil = 0
    const onFocus = (e: Event) => {
      manual = (e as CustomEvent<number>).detail
      manualUntil = t + 7
    }
    window.addEventListener('net:focus', onFocus)

    const mix = new Float32Array(N) // 0..1 highlight per node
    const tmp = new THREE.Color()
    let lastActive = -1
    let raf = 0
    let last = performance.now()
    let shown = false
    let settle = 0

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      if (!visible || document.hidden) return
      const still = (reduce || pinnedT !== null) && !drag && Math.abs(vel) < 1e-4 && Math.abs(par.tx - par.x) + Math.abs(par.ty - par.y) < 1e-3
      if (shown && still && settle > 1.5 && manual === null) return
      if (pinnedT === null && !reduce) t += dt
      settle += dt

      if (manual !== null && t > manualUntil && !reduce) manual = null
      const active = manual ?? (reduce ? 0 : Math.floor(t / CYCLE) % HUBS)
      if (active !== lastActive) {
        lastActive = active
        el.dataset.active = String(active)
        window.dispatchEvent(new CustomEvent('net:active', { detail: active }))
      }

      const k = reduce || pinnedT !== null ? 1 : 1 - Math.exp(-dt * 5)
      for (let i = 0; i < N; i++) {
        const target = hubOf[i] === active ? 1 : 0
        mix[i] += (target - mix[i]) * k
        const isHub = hubIdx.includes(i)
        tmp.copy(isHub ? hubCols[hubOf[i]] : base).lerp(hubCols[hubOf[i]], isHub ? 0 : mix[i] * 0.85)
        nodes.setColorAt(i, tmp)
        const pulse = isHub && hubOf[i] === active && !reduce ? 1 + Math.sin(t * 3) * 0.08 : 1
        const s = scale[i] * (1 + mix[i] * (isHub ? 0.3 : 0.6)) * pulse
        dummy.position.copy(pos[i])
        dummy.scale.setScalar(s)
        dummy.updateMatrix()
        nodes.setMatrixAt(i, dummy.matrix)
      }
      nodes.instanceMatrix.needsUpdate = true
      if (nodes.instanceColor) nodes.instanceColor.needsUpdate = true

      const faint = new THREE.Color('#E6DFF1')
      pairs.forEach(([a, b], j) => {
        const m = Math.min(mix[a], mix[b])
        tmp.copy(faint).lerp(hubCols[hubOf[a]], m)
        lc.set([tmp.r, tmp.g, tmp.b, tmp.r, tmp.g, tmp.b], j * 6)
      })
      lineGeo.attributes.color.needsUpdate = true

      if (!drag) {
        vel *= 0.94
        user += vel
      }
      par.x += (par.tx - par.x) * 0.05
      par.y += (par.ty - par.y) * 0.05
      const spin = reduce || pinnedT !== null ? 0 : t * 0.12
      group.rotation.y = 0.4 + spin + user + par.x * 0.2
      group.rotation.x = -0.18 + par.y * 0.12
      renderer.render(scene, camera)
      if (!shown) {
        shown = true
        renderer.domElement.style.opacity = '1'
        el.dataset.webgl = 'ready'
      }
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      renderer.domElement.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('net:focus', onFocus)
      geo.dispose()
      mat.dispose()
      lineGeo.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={host} className={className} data-webgl="loading" />
}
