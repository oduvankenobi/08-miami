import styled from 'styled-components';
import React, { useCallback } from 'react';
import { ITheme } from 'ui/themes';
import { TStyledForm } from 'uicomponents/Form/types';
import { Error } from 'uicomponents/Error/styled';

export const StyledForm = styled.form<ITheme>`
    padding: 50px 30px 20px;
    -webkit-border-radius: 12px;
    -moz-border-radius: 12px;
    border-radius: 12px;
    box-sizing: border-box;
    width: 100%;
    max-width: 340px;
    margin: 30px auto auto;
    box-shadow: 0 0 6px #ccc;
    text-align: left;

    & .title {
        text-align: center;
        font-size: 20px;
    }

    & button {
        width: 100%;
    }
`;

export const Form = React.forwardRef<HTMLFormElement, TStyledForm>(
    (props, ref) => {
        const {
            children,
            title = '',
            error,
            handleSubmit,
            ...rest
        } = props;

        const onSubmit = useCallback(
            (event: React.SyntheticEvent) => {
                event.preventDefault();

                if (handleSubmit) {
                    handleSubmit();
                }
            },
            [handleSubmit],
        );

        return (
            <StyledForm ref={ref} {...rest} onSubmit={onSubmit}>
                <div className="title">{title}</div>
                {children}
                {error ? <Error>{error}</Error> : ''}
            </StyledForm>
        );
    },
);
