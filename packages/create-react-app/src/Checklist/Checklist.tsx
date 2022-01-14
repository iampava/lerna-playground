import React, { useState } from 'react';
import { Button, Markdown, Avatar } from 'ui-library';
import './Checklist.css';
import './Checklist2.scss';

import mountainPhoto from 'ui-library/assets/mountain.jpg';

function Checklist() {
  const [showMarkdown, setShowMarkdown] = useState(false);

  return (
    <section className="Checklist">
      <h1> Lerna Playground | create-react-app</h1>
      <ol>
        <li>
          <h2> Basic component import from "ui-library"</h2>
          <p> If the below button is correctly styled, the import has worked.</p>
          <Button variant='success' loading> Green Loading Button</Button>
        </li>

        <li>
          <h2> Asset import from JS code</h2>
          <p> Picture below is added via the {'<img>'} tag</p>
          <img src={mountainPhoto} width="300" alt="Mountain Photo" />
        </li>

        <li>
          <h2> Asset import from CSS/SCSS code</h2>
          <p> Picture below is added via "background-image"</p>
          <p> Border color is imported from "ui-library" </p>
          <div className="ui-library-img" />
        </li>

        <li>
          <h2> Library can import and use it's own assets</h2>
          <Avatar />
        </li>

        <li>
          <h2> Lazy-load 3rd party modules</h2>
          <p> 1. Is the markdown correctly rendered? </p>
          <p> 2. Are the packages loaded in another chunk (see Network tab) </p>
          <Button variant='blue' onClick={() => setShowMarkdown(true)}>
            Show Markdown
          </Button>
          {showMarkdown && (
            <Markdown markdownString={`# Heading rendered from markdown
  [link rendered from markdown](https://google.com)
            `} />
          )}
        </li>
        <li>
          <h2> README.md</h2>
          <p> Have a look there for the full checklist.</p>
        </li>
      </ol>
    </section>
  );
}

export default Checklist;
