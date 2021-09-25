import styled from 'styled-components';
import React from 'react';
import { ITheme } from 'UI/themes';
import { TStyledInput } from 'UIComponents/Input/types';

export const StyledInputWrapper = styled.div<ITheme>`
    position: relative;
    margin: 32px 0;

    & label,
    & input {
        display: block;
        width: 100%;
    }

    & label {
        position: absolute;
        top: -10px;
        left: 0;
        color: ${({ theme }) => theme.colors.inputs.label};
        margin-bottom: 5px;
        transition: all 0.3s ease;
        font-size: 9px;
        z-index: -1;
    }
`;

export const StyledInput = styled.input<ITheme>`
    font-size: 13px;
    padding-bottom: 7px;
    box-sizing: border-box;
    outline: none;
    background-image: none;
    background-color: transparent;
    box-shadow: none;
    border: none;
    border-bottom: 1px solid;
    border-bottom-color: ${({ theme }) => theme.colors.inputs.borderColor};

    &:focus,
    &:focus-visible {
        outline: none;
    }

    &:focus {
        border-bottom-color: ${({ theme }) =>
            theme.colors.inputs.borderHoverColor};

        & + label {
            font-size: 9px;
            top: -10px;
        }
    }
`;

export const Input = React.forwardRef<HTMLInputElement, TStyledInput>(
    ({ ...props }, ref) => {
        const { children, label = '', name, ...rest } = props;

        return (
            <StyledInputWrapper>
                <StyledInput
                    ref={ref as React.MutableRefObject<HTMLInputElement>}
                    {...rest}
                >
                    {children}
                </StyledInput>
                <label htmlFor={name}>{label}</label>
            </StyledInputWrapper>
        );
    },
);
