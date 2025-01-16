export interface ITutorialProps {
    searchData?: string
    isOpen: boolean
    closeModal: () => void
}

export interface ITutorialData{
    title: string,
    description: string,
    image?: string
}