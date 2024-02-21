import Style from './Burger.module.scss'

interface BurgerProps {
  open: boolean
  setOpen(): void
}

const Burger: React.FC<BurgerProps> = ({ open, setOpen }) => {
  return (
    <div className={Style.burger} onClick={setOpen}>
      <span className={`${open ? Style.active : ''}`}></span>
      <span className={`${open ? Style.active : ''}`}></span>
      <span className={`${open ? Style.active : ''}`}></span>
    </div>
  )
}

export default Burger
