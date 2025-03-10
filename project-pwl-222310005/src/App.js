import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div class="container-sm" style={{padding: "30px"}}>
      <div class="row">
      <div class="mb-3">
        <label style={{fontSize: "30px"}} for="exampleFormControlInput1" class="form-label">NPM</label>
        <input type="text" max={10} class="form-control" id="exampleFormControlInput1" placeholder="Masukan NPM" />
      </div>
      </div>
    </div>
  );
}

export default App;
