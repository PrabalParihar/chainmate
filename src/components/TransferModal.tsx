"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog"
import { Button } from "./ui/button"
import { CheckCircle2 } from "lucide-react"

interface TransferModalProps {
  isOpen: boolean
  onClose: () => void
  data: {
    amount: string
    to: string
    txHash: string
  }
  message: string
}

export function TransferModal({ isOpen, onClose, data, message }: TransferModalProps) {
  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border border-zinc-800 text-zinc-100 max-w-md rounded">
        <div className="flex flex-col items-center justify-center gap-4 py-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-500/20 to-green-500/10 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-center text-zinc-100">Transfer Successful</DialogTitle>
          </DialogHeader>
        </div>

        <div className="space-y-4 px-2">
          <p className="text-center text-zinc-400 text-sm">{message}</p>

          <div className="space-y-3 bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Amount</span>
              <span className="text-zinc-100 font-medium">{data.amount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Destination</span>
              <span className="text-zinc-400 font-medium">
                {data.to.slice(0, 6)}...{data.to.slice(-4)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Transaction Hash</span>
              <a 
                href={`https://sepolia.basescan.org/tx/${data.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-400 underline"
              >
                {data.txHash.slice(0, 6)}...{data.txHash.slice(-4)}
              </a>
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-center">
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 text-white border-0 px-8 transition-all duration-300"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

