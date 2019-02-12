import React, { useState, useEffect } from 'react'

// export default function Hooks() {
//   const [count, setCount] = useState(0)

//   useEffect(() => {
//     document.title = `You clicked ${count} times`
//   })

//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setCount(count + 1)}>Click me</button>
//     </div>
//   )
// }

export default function FriendStatus() {
  const [isOnline, setIsOnline] = useState(null)

  function handleStatusChange(status) {
    setIsOnline(status.isOnline)
  }

  useEffect(() => {
    ChatAPi
  })

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
