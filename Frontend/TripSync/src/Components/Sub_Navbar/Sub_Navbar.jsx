import planeImage from '../../assets/plane.png';

function Sub_Navbar() {
  return (
    <div className='navbar navbar-expand-sm navbar-light bg-light'>
    <a className="navbar-brand h4 mb-0" href="#">
    <img className='d-inline-block align-top mx-1 mt-1'
           src={planeImage} width={20} height={20} />
        My Dream Place
      </a>
    </div>
  )
}

export default Sub_Navbar