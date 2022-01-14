import React from 'react';
import { Button } from 'ui-library';
import './Checklist.css';

import mountainPhoto from 'ui-library/assets/mountain.jpg';

function Checklist() {
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
          <h2> Asset import from 'ui-library'</h2>
          <p> If the picture below correctly shos, the import has worked.</p>
          <img src={mountainPhoto} width="300" alt="Mountain Photo" />
        </li>
      </ol>
    </section>
  );
}

export default Checklist;
