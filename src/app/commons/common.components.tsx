import React, { Children, PropsWithChildren } from 'react';
import './common.components.css';

interface ILabelData {
    id: string,
    htmlFor: string,
    content: string
}

interface IInputData {
    id: string,
    type: "number"|"text",
    value?: string|number
}

export function LabelInputComponent(
    {labelData, inputData, onChange}: {labelData: ILabelData, inputData: IInputData, onChange: (value: any)=> void}
) {
    const handleChange = (val) => {
        if (inputData.type === 'number') {
            onChange(Number(val));
        } else {
            onChange(val);
        }
    }
    return (
      <div className="flex items-start w-full max-md:flex-col md:mb-5">
        <label id={labelData.id} htmlFor={labelData.htmlFor} 
            className="block text-sm font-medium text-blue-600 w-32 mr-10">{labelData.content}</label>
        <input id={inputData.id} type={inputData.type} value={inputData.value ?? ""} className="h-10 grow bg-blue-300
         text-white p-1 focus:outline-amber-200 scroll-amber-300 hover:bg-green-300 scroll-mb-60 mt-1 block w-full px-3 
         py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500
          focus:border-blue-500 sm:text-sm" 
          onChange={(e) => handleChange(e.target.value)}
          />
      </div>
    )
}

function OneSquareComponent(
    {content, id, getId}: {content: string, id: string, getId: (id: string) => void}
){

    return (
        <div id={id} className="flex h-12 w-12 border-collapse justify-center self-center 
        border border-amber-300 text-3xl font-bold outline outline-amber-200"
        onClick={(e) => getId(e.currentTarget.id)}
        >{content}</div>
    )
}

export function MatrixOfSquareComponent(
    { matrix, handleMatrixCellHit }: {matrix: string[][], handleMatrixCellHit: (r: number, c: number)=> any}
){
    const clickOneSquare = (id: string) => {
        const [r, c] = id.split('_').map((v) => parseInt(v));
        console.log("r, c", r, c, matrix[r][c]);
        handleMatrixCellHit(r, c);
    }
    return (
        <div className="mt-1 flex w-fit flex-col justify-center gap-1 rounded-sm bg-blue-300 p-1">
            {
                matrix.map((row, rInd) =>(
                    <div className="flex flex-row justify-center">
                        {
                            row.map((c, cInd) => (
                                <OneSquareComponent 
                                    content={c} 
                                    id={`${rInd}_${cInd}`}
                                    getId={clickOneSquare}
                                ></OneSquareComponent>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
}

interface ICardProps {
    id: string
}
export function CenterCardComponent({id, children}: PropsWithChildren<ICardProps>)
{
    return (
        <div id={id} className="m-1 flex justify-center items-center gap-1 rounded-xl bg-blue-100 p-6 max-md:flex-col max-md:justify-center">
            { children }
        </div>
    )
}

export function SectionComponent({children}: PropsWithChildren<any>) {
    return (
          <div className="m-5 rounded-xl bg-blue-100 border border-amber-400">
            {children}
            </div>
    )
}

export function PageComponent({children}: PropsWithChildren<any>)
{
    return (
        <div className='w-full flex justify-center bg-gray-50'>
            <div className='bg-gray-100 max-w-lvh'>
                {children}
            </div>

        </div>
    )
}

interface IButton {
    id: string;
    content: string;
    onClick: () => void;
}
export function ButtonComponent(props: IButton) {
    return (
        <div className='flex items-start w-full'>
            <button  
                className="mt-1 h-12 block bg-blue-800 border w-full text-white rounded-md"
                id={props.id} 
                onClick={ () => props.onClick() }>{props.content.toUpperCase()}
            </button>
        </div>
    )
}