import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import styles from './Markdown.module.scss';

interface Props {
  markdownString: string;
  className?: string;
}

function Markdown({ markdownString, className = '' }: Props) {
  const markdownRef = useRef(null);
  const [didLoadDeps, setDidLoadDeps] = useState(undefined);

  useEffect(() => {
    Promise.all([
      import('marked'),
      import('dompurify'),
    ]).then(([markedModule, dompurifyModule]) => {
      const { marked } = markedModule;
      const dompurify = dompurifyModule.default;

      setDidLoadDeps(true);
      markdownRef.current.innerHTML = dompurify.sanitize(marked.parse(markdownString));
    }).catch((err) => {
      setDidLoadDeps(false);
      console.error('[Markdown.useEffect]', err);
    });
  }, [markdownString]);

  return (
    <div className={`${styles.markdown} ${className}`} ref={markdownRef}>
      {didLoadDeps === false && (
        <p className="font-light text-2xl">
          <FontAwesomeIcon
            size="2x"
            width="32"
            className="mr-2"
            icon={faExclamationTriangle}
          />
          We couldn't load the Markdown content. Please try again!
        </p>
      )}
    </div>
  );
}

export { Markdown };
