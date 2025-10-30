"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes";

const LETTER_SPACING = 1
const WORD_SPACING = 3

const PIXEL_MAP = {
  S: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 1],
    [1, 1, 1, 1],
  ],
  A: [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
  ],
  U: [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
  ],
  R: [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 1, 0],
    [1, 0, 0, 1],
  ],
  V: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
  ],
  K: [
    [1, 0, 0, 1],
    [1, 0, 1, 0],
    [1, 1, 0, 0],
    [1, 0, 1, 0],
    [1, 0, 0, 1],
  ],
  M: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
};

interface Pixel {
  x: number
  y: number
  size: number
  hit: boolean
}

interface Ball {
  x: number
  y: number
  dx: number
  dy: number
  radius: number
}

interface Paddle {
  x: number
  y: number
  width: number
  height: number
  targetY: number
  isVertical: boolean
}

export function AnimatedHeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pixelsRef = useRef<Pixel[]>([])
  const ballRef = useRef<Ball>({ x: 0, y: 0, dx: 0, dy: 0, radius: 0 })
  const paddlesRef = useRef<Paddle[]>([])
  const scaleRef = useRef(1);

  // Default theme values, will be updated from CSS variables
  const themeColors = useRef({
      background: 'hsl(0 0% 94.1%)',
      foreground: 'hsl(240 10% 3.9%)',
      primary: 'hsl(277 100% 25.5%)'
  });


  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return
    
    const updateThemeColors = () => {
        const styles = getComputedStyle(document.documentElement);
        themeColors.current = {
            background: `hsl(${styles.getPropertyValue('--background')})`,
            foreground: `hsl(${styles.getPropertyValue('--foreground')})`,
            primary: `hsl(${styles.getPropertyValue('--primary')})`,
        };
    };


    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      scaleRef.current = Math.min(canvas.width / 1000, canvas.height / 1000)
      updateThemeColors();
      initializeGame()
    }

    const initializeGame = () => {
      const scale = scaleRef.current
      const BASE_PIXEL_SIZE = 4 * scale
      const BALL_SPEED = 6 * scale

      pixelsRef.current = []
      const words = ["SAURAV", "KUMAR"]

      const calculateWordWidth = (word: string, pixelSize: number) => {
        return (
          word.split("").reduce((width, letter) => {
            const letterMap = PIXEL_MAP[letter as keyof typeof PIXEL_MAP];
            const letterWidth = letterMap?.[0]?.length ?? 0
            return width + letterWidth * pixelSize + LETTER_SPACING * pixelSize
          }, 0) -
          LETTER_SPACING * pixelSize
        )
      }
      
      const totalWidthLarge = calculateWordWidth(words[0], BASE_PIXEL_SIZE);
      const totalWidthSmall = calculateWordWidth(words[1], BASE_PIXEL_SIZE);
      
      const totalWidth = Math.max(totalWidthLarge, totalWidthSmall);
      
      // Responsive scaling factor
      const canvasWidth = canvas.width;
      let desiredWidthFraction;
      if (canvasWidth < 480) { // Small mobile
          desiredWidthFraction = 0.9;
      } else if (canvasWidth < 768) { // Mobile devices
        desiredWidthFraction = 0.8;
      } else if (canvasWidth < 1024) { // Tablets
        desiredWidthFraction = 0.5;
      } else { // Desktop
        desiredWidthFraction = 0.3;
      }
      
      const scaleFactor = (canvasWidth * desiredWidthFraction) / totalWidth;

      const adjustedPixelSize = Math.max(2, BASE_PIXEL_SIZE * scaleFactor * 0.8); // Minimum pixel size of 2, 20% smaller
      
      const textHeight = 5 * adjustedPixelSize;
      const spaceBetweenLines = 3 * adjustedPixelSize;
      const totalTextHeight = textHeight * 2 + spaceBetweenLines;

      let startY = (canvas.height - totalTextHeight) / 2

      words.forEach((word) => {
        const pixelSize = adjustedPixelSize;
        const currentWordWidth = calculateWordWidth(word, pixelSize);
        let startX = (canvas.width - currentWordWidth) / 2

        word.split("").forEach((letter) => {
            const pixelMap = PIXEL_MAP[letter as keyof typeof PIXEL_MAP]
            if (!pixelMap) return

            for (let i = 0; i < pixelMap.length; i++) {
                for (let j = 0; j < pixelMap[i].length; j++) {
                    if (pixelMap[i][j]) {
                        const x = startX + j * pixelSize
                        const y = startY + i * pixelSize
                        pixelsRef.current.push({ x, y, size: pixelSize, hit: false })
                    }
                }
            }
            startX += (pixelMap[0].length + LETTER_SPACING) * pixelSize
        })

        startY += textHeight + spaceBetweenLines
      })

      const ballStartX = canvas.width * 0.9
      const ballStartY = canvas.height * 0.1

      ballRef.current = {
        x: ballStartX,
        y: ballStartY,
        dx: -BALL_SPEED,
        dy: BALL_SPEED,
        radius: (adjustedPixelSize / 2) * 1.5,
      }

      const paddleWidth = (adjustedPixelSize / 2) * 1.5;
      const paddleLength = 10 * adjustedPixelSize * 1.5;

      paddlesRef.current = [
        {
          x: 0,
          y: canvas.height / 2 - paddleLength / 2,
          width: paddleWidth,
          height: paddleLength,
          targetY: canvas.height / 2 - paddleLength / 2,
          isVertical: true,
        },
        {
          x: canvas.width - paddleWidth,
          y: canvas.height / 2 - paddleLength / 2,
          width: paddleWidth,
          height: paddleLength,
          targetY: canvas.height / 2 - paddleLength / 2,
          isVertical: true,
        },
        {
          x: canvas.width / 2 - paddleLength / 2,
          y: 0,
          width: paddleLength,
          height: paddleWidth,
          targetY: canvas.width / 2 - paddleLength / 2,
          isVertical: false,
        },
        {
          x: canvas.width / 2 - paddleLength / 2,
          y: canvas.height - paddleWidth,
          width: paddleLength,
          height: paddleWidth,
          targetY: canvas.width / 2 - paddleLength / 2,
          isVertical: false,
        },
      ]
    }

    const updateGame = () => {
      const ball = ballRef.current
      const paddles = paddlesRef.current

      ball.x += ball.dx
      ball.y += ball.dy

      if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy
      }
      if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.dx = -ball.dx
      }

      paddles.forEach((paddle) => {
        if (paddle.isVertical) {
          if (
            ball.x - ball.radius < paddle.x + paddle.width &&
            ball.x + ball.radius > paddle.x &&
            ball.y > paddle.y &&
            ball.y < paddle.y + paddle.height
          ) {
            ball.dx = -ball.dx
          }
        } else {
          if (
            ball.y - ball.radius < paddle.y + paddle.height &&
            ball.y + ball.radius > paddle.y &&
            ball.x > paddle.x &&
            ball.x < paddle.x + paddle.width
          ) {
            ball.dy = -ball.dy
          }
        }
      })

      paddles.forEach((paddle) => {
        if (paddle.isVertical) {
          paddle.targetY = ball.y - paddle.height / 2
          paddle.targetY = Math.max(0, Math.min(canvas.height - paddle.height, paddle.targetY))
          paddle.y += (paddle.targetY - paddle.y) * 0.1
        } else {
          paddle.targetY = ball.x - paddle.width / 2
          paddle.targetY = Math.max(0, Math.min(canvas.width - paddle.width, paddle.targetY))
          paddle.x += (paddle.targetY - paddle.x) * 0.1
        }
      })

      pixelsRef.current.forEach((pixel) => {
        if (
          !pixel.hit &&
          ball.x + ball.radius > pixel.x &&
          ball.x - ball.radius < pixel.x + pixel.size &&
          ball.y + ball.radius > pixel.y &&
          ball.y - ball.radius < pixel.y + pixel.size
        ) {
          pixel.hit = true
          const centerX = pixel.x + pixel.size / 2
          const centerY = pixel.y + pixel.size / 2
          if (Math.abs(ball.x - centerX) > Math.abs(ball.y - centerY)) {
            ball.dx = -ball.dx
          } else {
            ball.dy = -ball.dy
          }
        }
      })
    }

    const drawGame = () => {
      if (!ctx) return

      const { background, foreground, primary } = themeColors.current;

      ctx.fillStyle = background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      pixelsRef.current.forEach((pixel) => {
        ctx.fillStyle = pixel.hit ? background : foreground
        ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size)
      })

      ctx.fillStyle = foreground
      ctx.beginPath()
      ctx.arc(ballRef.current.x, ballRef.current.y, ballRef.current.radius, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = foreground
      paddlesRef.current.forEach((paddle) => {
        ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)
      })
    }

    let animationFrameId: number;
    const gameLoop = () => {
      updateGame()
      drawGame()
      animationFrameId = requestAnimationFrame(gameLoop)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Use MutationObserver to detect theme changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class' || mutation.attributeName === 'style') {
                updateThemeColors();
            }
        });
    });

    observer.observe(document.documentElement, { attributes: true });

    gameLoop()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      aria-label="Interactive portfolio background animation"
    />
  )
}

export default AnimatedHeroSection;
