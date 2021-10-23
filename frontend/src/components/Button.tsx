import './Button.css';

type Props = {
  children: any;
  onClick: any;
};

const Button = (props: Props) => {
  return (
    <button onClick={props.onClick} className='button'>
      {props.children}
    </button>
  );
};

export default Button;
