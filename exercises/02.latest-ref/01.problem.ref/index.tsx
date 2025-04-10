import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as ReactDOM from 'react-dom/client'

function debounce<Callback extends (...args: Array<unknown>) => void>(
	fn: Callback,
	delay: number,
) {
	let timer: ReturnType<typeof setTimeout> | null = null
	return (...args: Parameters<Callback>) => {
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			fn(...args)
		}, delay)
	}
}

function useDebounce<Callback extends (...args: Array<unknown>) => unknown>(
	callback: Callback,
	delay: number,
) {
	const callbackRef = useRef(callback)
	useEffect(() => {
		callbackRef.current = callback
	})
	return useMemo(
		() => debounce((...args) => callbackRef.current(...args), delay),
		[delay],
	)
}

function App() {
	const [step, setStep] = useState(1)
	const [count, setCount] = useState(0)
	const increment = () => setCount((c) => c + step)
	const debouncedIncrement = useDebounce(increment, 3000)
	return (
		<div>
			<div>
				<label>
					Step:{' '}
					<input
						type="number"
						step="1"
						min="1"
						max="10"
						onChange={(e) => setStep(Number(e.currentTarget.value))}
						defaultValue={step}
					/>
				</label>
			</div>
			<button onClick={debouncedIncrement}>{count}</button>
		</div>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
ReactDOM.createRoot(rootEl).render(<App />)
