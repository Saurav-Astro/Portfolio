"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, ArrowDown, RotateCw } from "lucide-react";

// Game constants
const BOARD_WIDTH = 10
const BOARD_HEIGHT = 20
const EMPTY_CELL = 0

// Tetromino shapes and colors matching the theme
const TETROMINOES = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "bg-teal-400",
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "bg-yellow-400",
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "bg-purple-500",
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: "bg-green-500",
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: "bg-red-500",
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "bg-blue-500",
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "bg-orange-500",
  },
}

const TETROMINO_KEYS = Object.keys(TETROMINOES)

type TetrominoType = keyof typeof TETROMINOES
type Board = (number | string)[][]
type Position = { x: number; y: number }

interface Piece {
  shape: number[][]
  color: string
  position: Position
  type: TetrominoType
}

export const BlockGame = () => {
  const [board, setBoard] = useState<Board>(() =>
    Array(BOARD_HEIGHT)
      .fill(null)
      .map(() => Array(BOARD_WIDTH).fill(EMPTY_CELL)),
  )
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [lines, setLines] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [cellSize, setCellSize] = useState(24);

  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth < 640) {
            setCellSize(20);
        } else {
            setCellSize(24);
        }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Create a new random piece
  const createNewPiece = useCallback((): Piece => {
    const randomType = TETROMINO_KEYS[Math.floor(Math.random() * TETROMINO_KEYS.length)] as TetrominoType
    const tetromino = TETROMINOES[randomType]
    return {
      shape: tetromino.shape,
      color: tetromino.color,
      position: { x: Math.floor(BOARD_WIDTH / 2) - Math.floor(tetromino.shape[0].length / 2), y: 0 },
      type: randomType,
    }
  }, [])

  // Check if a piece can be placed at a position
  const canPlacePiece = useCallback(
    (piece: Piece, newPosition: Position): boolean => {
      for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
          if (piece.shape[y][x]) {
            const newX = newPosition.x + x
            const newY = newPosition.y + y

            if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
              return false
            }

            if (newY >= 0 && board[newY][newX] !== EMPTY_CELL) {
              return false
            }
          }
        }
      }
      return true
    },
    [board],
  )

  // Rotate a piece 90 degrees clockwise
  const rotatePiece = useCallback((piece: Piece): Piece => {
    const rotated = piece.shape[0].map((_, index) => piece.shape.map((row) => row[index]).reverse())
    return { ...piece, shape: rotated }
  }, [])

  // Place piece on board
  const placePieceOnBoard = useCallback(
    (piece: Piece): Board => {
      const newBoard = board.map((row) => [...row])

      for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
          if (piece.shape[y][x]) {
            const boardY = piece.position.y + y
            const boardX = piece.position.x + x
            if (boardY >= 0) {
              newBoard[boardY][boardX] = piece.color
            }
          }
        }
      }

      return newBoard
    },
    [board],
  )

  // Clear completed lines
  const clearLines = useCallback((board: Board): { newBoard: Board; linesCleared: number } => {
    const newBoard = board.filter((row) => row.some((cell) => cell === EMPTY_CELL))
    const linesCleared = BOARD_HEIGHT - newBoard.length

    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(EMPTY_CELL))
    }

    return { newBoard, linesCleared }
  }, [])

  const handleMoveLeft = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;
    const leftPosition = { ...currentPiece.position, x: currentPiece.position.x - 1 };
    if (canPlacePiece(currentPiece, leftPosition)) {
      setCurrentPiece({ ...currentPiece, position: leftPosition });
    }
  }, [currentPiece, gameOver, isPaused, canPlacePiece]);

  const handleMoveRight = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;
    const rightPosition = { ...currentPiece.position, x: currentPiece.position.x + 1 };
    if (canPlacePiece(currentPiece, rightPosition)) {
      setCurrentPiece({ ...currentPiece, position: rightPosition });
    }
  }, [currentPiece, gameOver, isPaused, canPlacePiece]);

  const handleRotate = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;
    const rotated = rotatePiece(currentPiece);
    if (canPlacePiece(rotated, rotated.position)) {
      setCurrentPiece(rotated);
    }
  }, [currentPiece, gameOver, isPaused, rotatePiece, canPlacePiece]);

  // Move piece down
  const movePieceDown = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return

    const newPosition = { ...currentPiece.position, y: currentPiece.position.y + 1 }

    if (canPlacePiece(currentPiece, newPosition)) {
      setCurrentPiece({ ...currentPiece, position: newPosition })
    } else {
      // Place piece and create new one
      const newBoard = placePieceOnBoard(currentPiece)
      const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard)

      setBoard(clearedBoard)
      setLines((prev) => prev + linesCleared)
      setScore((prev) => prev + linesCleared * 100 * level)

      const nextPiece = createNewPiece()
      if (canPlacePiece(nextPiece, nextPiece.position)) {
        setCurrentPiece(nextPiece)
      } else {
        setGameOver(true)
      }
    }
  }, [currentPiece, gameOver, isPaused, canPlacePiece, placePieceOnBoard, clearLines, level, createNewPiece])

  // Handle keyboard input
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (gameOver || isPaused) return

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault()
          handleMoveLeft();
          break

        case "ArrowRight":
          event.preventDefault()
          handleMoveRight();
          break

        case "ArrowDown":
          event.preventDefault()
          movePieceDown()
          break

        case "ArrowUp":
        case " ":
          event.preventDefault()
          handleRotate();
          break
      }
    },
    [gameOver, isPaused, handleMoveLeft, handleMoveRight, movePieceDown, handleRotate],
  )

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver || isPaused) return

    const interval = setInterval(
      () => {
        movePieceDown()
      },
      Math.max(100, 1000 - (level - 1) * 100),
    )

    return () => clearInterval(interval)
  }, [gameStarted, gameOver, isPaused, level, movePieceDown])

  // Keyboard event listeners
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [handleKeyPress])

  // Update level based on lines cleared
  useEffect(() => {
    setLevel(Math.floor(lines / 10) + 1)
  }, [lines])

  // Start game
  const startGame = () => {
    setBoard(
      Array(BOARD_HEIGHT)
        .fill(null)
        .map(() => Array(BOARD_WIDTH).fill(EMPTY_CELL)),
    )
    setCurrentPiece(createNewPiece())
    setScore(0)
    setLevel(1)
    setLines(0)
    setGameOver(false)
    setIsPaused(false)
    setGameStarted(true)
  }

  // Render the game board with current piece
  const renderBoard = () => {
    const displayBoard = board.map((row) => [...row])

    // Add current piece to display board
    if (currentPiece) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const boardY = currentPiece.position.y + y
            const boardX = currentPiece.position.x + x
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              displayBoard[boardY][boardX] = 2 // Current piece
            }
          }
        }
      }
    }

    return displayBoard.map((row, y) => (
      <div key={y} className="flex">
        {row.map((cell, x) => {
          let cellClass = "bg-background/20"
          if (cell === 2) {
             cellClass = currentPiece?.color || 'bg-secondary'
          } else if (typeof cell === 'string') {
             cellClass = cell
          }
          return (
            <div
              key={x}
              className={`border border-white/10 ${cellClass}`}
              style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
            />
          )
        })}
      </div>
    ))
  }

  return (
    <section id="block-game" className="flex flex-col items-center p-4 py-16 md:py-24 lg:py-32 w-full">
      <h2 className="text-3xl font-bold font-headline mb-8 sm:text-5xl">Retro Vibe</h2>

      <div className="flex flex-col lg:flex-row gap-8 justify-center items-center lg:items-start w-full max-w-4xl">
        <div className="flex flex-col items-center gap-4">
            <Card className="p-2 sm:p-4 bg-card/50 backdrop-blur-lg border-white/10">
            <div className="border-2 border-white/20">{renderBoard()}</div>
            </Card>

            <div className="flex lg:hidden justify-center gap-2 w-full">
                <Button variant="outline" size="icon" className="w-16 h-16 rounded-full" onClick={handleMoveLeft}>
                    <ArrowLeft className="h-8 w-8" />
                </Button>
                 <Button variant="outline" size="icon" className="w-16 h-16 rounded-full" onClick={handleMoveRight}>
                    <ArrowRight className="h-8 w-8" />
                </Button>
                <Button variant="outline" size="icon" className="w-16 h-16 rounded-full" onClick={movePieceDown}>
                    <ArrowDown className="h-8 w-8" />
                </Button>
                <Button variant="outline" size="icon" className="w-16 h-16 rounded-full" onClick={handleRotate}>
                    <RotateCw className="h-8 w-8" />
                </Button>
            </div>
        </div>

        {/* Game Info */}
        <div className="space-y-4 w-full max-w-sm lg:max-w-xs">
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-card/50 backdrop-blur-lg border-white/10 text-center">
              <CardHeader className="p-2 sm:p-4 pb-1 sm:pb-2">
                <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Score</h3>
              </CardHeader>
              <CardContent className="p-2 sm:p-4 pt-0">
                <p className="text-xl sm:text-2xl font-bold">{score}</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-lg border-white/10 text-center">
              <CardHeader className="p-2 sm:p-4 pb-1 sm:pb-2">
                <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Level</h3>
              </CardHeader>
              <CardContent className="p-2 sm:p-4 pt-0">
                <p className="text-xl sm:text-2xl font-bold">{level}</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-lg border-white/10 text-center">
              <CardHeader className="p-2 sm:p-4 pb-1 sm:pb-2">
                <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Lines</h3>
              </CardHeader>
              <CardContent className="p-2 sm:p-4 pt-0">
                <p className="text-xl sm:text-2xl font-bold">{lines}</p>
              </CardContent>
            </Card>
          </div>

          {/* Controls */}
          <Card className="bg-card/50 backdrop-blur-lg border-white/10">
            <CardHeader className="p-4">
              <h3 className="font-headline text-lg">Controls</h3>
            </CardHeader>
            <CardContent className="p-4 pt-0 text-sm space-y-1 text-muted-foreground">
              <p><span className="font-bold text-foreground">← →</span> : Move</p>
              <p><span className="font-bold text-foreground">↓</span> : Soft drop</p>
              <p><span className="font-bold text-foreground">↑ / Space</span> : Rotate</p>
            </CardContent>
          </Card>

          {/* Game Controls */}
          <div className="space-y-2 pt-2">
            {!gameStarted || gameOver ? (
              <Button onClick={startGame} className="w-full">
                {gameOver ? "Play Again" : "Start Game"}
              </Button>
            ) : (
              <Button onClick={() => setIsPaused(!isPaused)} variant="secondary" className="w-full">
                {isPaused ? "Resume" : "Pause"}
              </Button>
            )}
          </div>

          {gameOver && (
            <Card className="border-destructive/50 bg-destructive/20">
              <CardContent className="p-4 pt-4">
                <p className="text-center text-destructive-foreground font-bold">Game Over!</p>
                <p className="text-center text-sm text-destructive-foreground/80">Final Score: {score}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}
