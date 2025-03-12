import { Label, Textarea } from 'flowbite-react'
import React from 'react'
import { useController, UseControllerProps } from 'react-hook-form'

type Props = {
    label: string
    rows?: number
    showlabel?: string
} & UseControllerProps

export default function InputArea(props: Props) {
    const {fieldState, field} = useController({...props, defaultValue: ''})

    return (
        <div className='mb-8'>
            {props.showlabel=='true' && (
                <div className='mb-2 block text-darkgrey'>
                    <Label htmlFor={field.name} value={props.label}/>
                </div>
            )}
            <div className='mb-6 block text-secondary'>
                <Textarea 
                    {...props}
                    {...field}
                    rows={props.rows || 4}
                    placeholder={props.label}
                    color={fieldState.error ? 'failure' : !fieldState.isDirty ? '' : 'success'}
                    helperText={fieldState.error?.message}
                />
            </div>
        </div>
    )
}