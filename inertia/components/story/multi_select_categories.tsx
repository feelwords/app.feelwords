import { useEffect, useState } from 'react'
import { getAllCategories } from '~/actions/categories'
import Category from '#models/category'
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from '~/components/ui/multi-select'

export const MultiSelect = ({
  setCategoriesValue,
  categoriesValue,
}: {
  setCategoriesValue: (value: string[]) => void
  categoriesValue: string[]
}) => {
  let [options, setOptions] = useState<{ value: string; label: string }[]>([])

  useEffect(() => {
    getAllCategories().then((response) => {
      const data: Category[] = response.data
      data.map((category: Category) => {
        setOptions((prev) => [...prev, { value: category.id.toString(), label: category.label }])
      })
    })
  }, [])

  return (
    <MultiSelector values={categoriesValue} onValuesChange={setCategoriesValue} loop={false}>
      <MultiSelectorTrigger>
        <MultiSelectorInput placeholder="Vos catégories" />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {options?.map((option, i) => (
            <MultiSelectorItem key={i} value={option.label}>
              {option.label}
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  )
}
