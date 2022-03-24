// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import React from 'react';
import Counter from './counter';

const App : React.FC = () : React.ReactElement  => <div style={style}>
     <h1>Web remote app</h1>
     <Counter />
</div>

const style = {
     backgroundColor: '#cacaca'
} 

export default App;
