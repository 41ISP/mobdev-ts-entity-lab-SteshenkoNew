import { useState, type FormEvent } from "react"
import {
    CATEGORIES,
    CATEGORY_LABELS,
    MATERIALS,
    MATERIAL_LABELS,
    type ToiletCategory,
    type ToiletMaterial,
    type TToiletInput,
} from "../Store/types"


const initialForm: TToiletInput = {
    Name: "",
    Description: "",
    Price: 0,
    Rating: 5,
    DateCreate: new Date().toISOString().slice(0, 10),
    Material: MATERIALS[0], 
    Category: CATEGORIES[0],
}

interface IToiletFormProps {
    onSubmit: (input: TToiletInput) => Promise<void>
}

export function ToiletForm({ onSubmit }: IToiletFormProps) {
    const [form, setForm] = useState<TToiletInput>(initialForm)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onChange = <K extends keyof TToiletInput>(
        key: K,
        value: TToiletInput[K]
    ) => {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            await onSubmit(form)
            setForm(initialForm) 
        } catch {
            
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2>Добавить туалет</h2>

            <label className="field">
                Название
                <input
                    type="text"
                    required
                    maxLength={120}
                    value={form.Name}
                    onChange={(e) => onChange("Name", e.target.value)}
                />
            </label>

            <label className="field">
                Описание
                <textarea
                    rows={3}
                    value={form.Description ?? ""}
                    onChange={(e) => onChange("Description", e.target.value)}
                />
            </label>

            <div className="row">
                <label className="field">
                    Цена, ₽
                    <input
                        type="number"
                        min={0}
                        step={0.01}
                        required
                        value={form.Price}
                        onChange={(e) => onChange("Price", Number(e.target.value))}
                    />
                </label>

                <label className="field">
                    Рейтинг: {form.Rating}
                    <input
                        type="range"
                        min={0}
                        max={10}
                        step={1}
                        value={form.Rating ?? 0}
                        onChange={(e) => onChange("Rating", Number(e.target.value))}
                    />
                </label>
            </div>

            <label className="field">
                Дата добавления
                <input
                    type="date"
                    required
                    value={form.DateCreate}
                    onChange={(e) => onChange("DateCreate", e.target.value)}
                />
            </label>

            <div className="row">
                <label className="field">
                    Материал
                    <select
                        value={form.Material}
                        onChange={(e) =>
                            onChange("Material", e.target.value as ToiletMaterial)
                        }
                    >
                        {MATERIALS.map((m) => (
                            <option key={m} value={m}>
                                {MATERIAL_LABELS[m]}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="field">
                    Категория
                    <select
                        value={form.Category}
                        onChange={(e) =>
                            onChange("Category", e.target.value as ToiletCategory)
                        }
                    >
                        {CATEGORIES.map((c) => (
                            <option key={c} value={c}>
                                {CATEGORY_LABELS[c]}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <button className="btn" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Сохраняем…" : "Добавить туалет"}
            </button>
        </form>
    )
}