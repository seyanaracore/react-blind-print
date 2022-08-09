interface IClassName {
  [className: string]: string
}

declare module '*.scss' {
  const classNames: IClassName
  export default classNames
}

declare module '*.css' {
  const classNames: IClassName
  export default classNames
}
