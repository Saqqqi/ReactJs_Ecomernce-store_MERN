import Spinner from 'react-bootstrap/Spinner';
import '../../../frontend/src/App.css'; // Import the CSS file for styling

function Loading() {
  return (
    <div className="loading-container">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loading;
