import './Button.css'
function Button(props: any) {
    return (
        <button className='button' type={props.type}>{props.text}</button>
    )
}
export { Button }