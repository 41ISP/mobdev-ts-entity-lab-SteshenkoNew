import { useEffect, useState } from "react"
import { ToiletCard } from "./components/ToiletCard"
import { ToiletForm } from "./components/ToiletForm"
import { useToiletsStore } from "./Store/UseToiletsStore"
import "./App.css"

export default function App() {
    const { toilets, getToilets, createToilet, deleteToilet } = useToiletsStore()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const load = async () => {
            setLoading(true)
            setError(null)
            try {
                await getToilets()
            } catch (e) {
        
                const msg =
                    e instanceof Error ? e.message : "Не удалось загрузить список"
                console.error(e)
                setError(msg)
            } finally {
                setLoading(false)
            }
        }
        load()
       
    }, [])

    return (
        <div className="layout">
            <header className="top">
                <h1>Мои туалеты</h1>
                {toilets?.meta && (
                    <span className="pill">{toilets.meta.pagination.total}</span>
                )}
            </header>

            <aside>
         
                <ToiletForm onSubmit={createToilet} />
            </aside>

            <main>
              
                {error && <p className="error">Ошибка: {error}</p>}

                {loading && <p className="hint">Загружаем туалеты…</p>}

                {!loading && !error && toilets?.data && toilets.data.length > 0 && (
                    <div className="grid">
                        {toilets.data.map((el) => (
                       
                            <ToiletCard
                                key={el.documentId}
                                {...el}
                                onDelete={deleteToilet}
                            />
                        ))}
                    </div>
                )}

 
                {!loading && !error && (!toilets?.data || toilets.data.length === 0) && (
                    <p className="hint">Список пуст. Добавьте первый туалет через форму.</p>
                )}
            </main>
        </div>
    )
}