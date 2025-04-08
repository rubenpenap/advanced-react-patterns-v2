import { createContext, use } from 'react'

type Slots = Record<string, Record<string, unknown>>
export const SlotContext = createContext<Slots>({})

function useSlotProps<Props>(props: Props, slot: string): Props {
	const slots = use(SlotContext)
	return { ...slots[slot], slot, ...props } as Props
}

export function Label(props: React.ComponentProps<'label'>) {
	props = useSlotProps(props, 'label')
	return <label {...props} />
}

export function Input(props: React.ComponentProps<'input'>) {
	props = useSlotProps(props, 'input')
	return <input {...props} />
}
