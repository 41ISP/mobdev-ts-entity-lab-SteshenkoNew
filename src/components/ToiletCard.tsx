import { API_URL } from "../api"
import {
    CATEGORY_LABELS,
    MATERIAL_LABELS,
    type IToilet,
} from "../Store/types"

interface IToiletCard extends IToilet {
    onDelete: (documentId: string) => void
}

export function ToiletCard({
    documentId,
    Name,
    Description,
    Price,
    DateCreate,
    Material,
    Category,
    Rating,
    Media,
    onDelete,
}: IToiletCard) {
    return (
        <article className="card">
            <div className="card__cover">
                {Media ? (
                    <img
                        src={API_URL + Media.url}
                        alt={Media.alternativeText ?? Name}
                    />
                ) : (
                    <span>{Name.charAt(0)}</span>
                )}
                {Rating != null && <b className="card__badge">{Rating}</b>}
            </div>

            <div className="card__body">
                <h3>{Name}</h3>

                {Description && <p className="card__desc">{Description}</p>}

                <p className="card__meta">Категория: {CATEGORY_LABELS[Category]}</p>
                <p className="card__meta">Материал: {MATERIAL_LABELS[Material]}</p>

                {DateCreate && (
                    <p className="card__meta">
                        Добавлен: {new Date(DateCreate).toLocaleDateString("ru-RU")}
                    </p>
                )}
            </div>

            <footer className="card__footer">
                
                <strong>{Number(Price ?? 0).toFixed(2)} ₽</strong>
                <button className="link-btn" onClick={() => onDelete(documentId)}>
                    Удалить
                </button>
            </footer>
        </article>
    )
}