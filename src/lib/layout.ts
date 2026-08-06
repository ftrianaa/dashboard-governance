/**
 * Tinggi header didefinisikan secara eksplisit (bukan dari padding)
 * agar Header dan Sidebar bisa saling sinkron posisi "sticky"-nya.
 */
export const HEADER_HEIGHT = {
  base: "64px",
  md: "80px",
} as const;