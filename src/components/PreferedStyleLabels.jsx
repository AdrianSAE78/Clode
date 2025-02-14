
const PreferedStyleLabel = ({ label, colorIndex, onClick }) => {
    const backgroundColor = colorIndex % 2 === 0 ? "var(--primary)" : "var(--tertiary)";
    return (
        <div className="categorie-select" style={{ backgroundColor, cursor: "pointer" }} onClick={() => onClick(label)}>
            <p className="label-large label-prefered-style">{label}</p>
        </div>
    )
}

export default PreferedStyleLabel