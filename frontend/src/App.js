import logo from './logo.svg';
import './App.css';
import Map from './components/Map';

function App() {
  return (
    <div>

      <div className="bg-blue-500 text-2xl font-bold text-white py-2 px-10">
        AccCity
      </div>

      <div className="text-2xl">
        <div className='h-screen w-3/6'>
          <Map />
        </div>
        <div className='h-screen w-2/6'>
          {/* Buttons */}
        </div>
        <div className='h-screen w-1/6'>
          {/* Score */}
        </div>
      </div>
    
    </div>
  );
}

export default App;
