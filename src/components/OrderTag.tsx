import type React from "react"

type StatusType = "processing" | "in-transit" | "delivered" | "canceled"

interface StatusTagProps {
  status: StatusType
  className?: string
}

const StatusTag: React.FC<StatusTagProps> = ({ status, className = "" }) => {
  const getStatusStyles = (status: StatusType): string => {
    const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"

    switch (status) {
      case "processing":
        return `${baseStyles} bg-amber-100 text-amber-800 border border-amber-200`
      case "in-transit":
        return `${baseStyles} bg-blue-100 text-blue-800 border border-blue-200`
      case "delivered":
        return `${baseStyles} bg-green-100 text-green-800 border border-green-200`
      case "canceled":
        return `${baseStyles} bg-red-100 text-red-800 border border-red-200`
      default:
        return `${baseStyles} bg-gray-100 text-gray-800 border border-gray-200`
    }
  }

  const getStatusIcon = (status: StatusType): string => {
    switch (status) {
      case "processing":
        return "⏳"
      case "in-transit":
        return "🚚"
      case "delivered":
        return "✅"
      case "canceled":
        return "❌"
      default:
        return "❓"
    }
  }

  return (
    <span className={`${getStatusStyles(status)} ${className}`}>
      <span className="mr-1" aria-hidden="true">
        {getStatusIcon(status)}
      </span>
      {status.replace("-", " ")}
    </span>
  )
}

export default StatusTag
