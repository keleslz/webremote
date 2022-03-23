// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import React, { Suspense  } from "react";

const RemoteApp = React.lazy(() => import('remote/App'));
console.log('nktm')
// console.log(RemoteApp, 'remote-------------------------')

export function App() {
  return (
    <>
      <h1>Web local app</h1>

      {/*   <Suspense fallback={"loading..."}>
          <RemoteApp />
        </Suspense>
 */}
    </>
  );
}

export default App;
