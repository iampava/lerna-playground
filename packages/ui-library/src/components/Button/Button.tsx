import React, { PropsWithChildren } from 'react';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Button.module.scss';

export type Variant = 'blue' | 'danger' | 'success';
interface Props {
  loading?: boolean;
  variant?: Variant;
  withIcon?: boolean;
}
export type Ref = HTMLButtonElement;
const Button = React.forwardRef<
  Ref,
  PropsWithChildren<Props> & React.ButtonHTMLAttributes<HTMLButtonElement>
>(
  (
    {
      loading = false,
      variant = 'blue',
      withIcon = false,
      className = "",
      children,
      disabled,
      ...props
    }: PropsWithChildren<Props> & React.ButtonHTMLAttributes<HTMLButtonElement>,
    forwardRef,
  ) => (
    <button
      type={props.type || 'button'}
      className={`
        ${className}
        ${styles.btn} 
        ${styles[`btn--${variant}`]}
        ${loading ? styles['btn--loading'] : ''}
      `}
      disabled={loading || disabled}
      ref={forwardRef}
      {...props}
    >
      {withIcon && (
        <FontAwesomeIcon icon={faCode} height="24" />
      )}
      {children}
    </button>
  ),
);

// Named exports play better with this whole setup.
// Not sure why, need to investigate.
export { Button };
