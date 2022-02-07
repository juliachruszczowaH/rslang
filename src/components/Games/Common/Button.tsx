import React, { ButtonHTMLAttributes, FC } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement>{}

export  const Button: FC<IButton> = ({children, ...props})=>{
    return(
        <button {...props}>
            {children}
        </button>
    )
}
type ButtonWrapperProps = {
    correct: boolean;
    userClicked: boolean;
  };
  

export const CustomButton: React.FC<ButtonWrapperProps> = ({
    children,
    ...props
}) => {
    return (
        <div  {...props}>
            {children}
            
        </div>
    );
};

export default Button