
const PreferedStyleLabel = ({ label, colorIndex, onClick, active }) => {
    const backgroundColor = colorIndex % 2 === 0 ? "even" : "pair";
    const stateColor = active ? "active-btn": "desactive-btn"
    return (
        <button type="button" className={`categorie-select  ${backgroundColor} ${stateColor}`} onClick={() => onClick(label)}>
            <p className="label-large label-prefered-style">{label}</p>
        </button>
    )
}

export default PreferedStyleLabel