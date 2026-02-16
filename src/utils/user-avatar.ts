export const getInitials = (name: string) => {
  const parts = name.trim().split(' ')

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export const getAvatarColor = (name: string) => {
  const colors = [
    'bg-blue-400',
    'bg-emerald-400',
    'bg-amber-400',
    'bg-violet-400',
    'bg-rose-400',
    'bg-sky-400',
  ]

  const sum = name
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0)

  return colors[sum % colors.length]
}
