import './Button.css';

type Props = {
    children: any,
    onClick: any
}

const Button = (props: Props) => {
    return <div className='button'>{props.children}</div>
}

export default Button;