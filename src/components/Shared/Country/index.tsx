import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { RootState } from '@/store';
import { CountryActions } from '@/store/ducks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



const countryFlags = {
    "BRASIL": <span className="fi fi-br"></span>,
    "ARGENTINA": <span className="fi fi-ar"></span>,
    "PERU": <span className="fi fi-pe"></span>,
    "CHILE":  <span className="fi fi-cl"></span>,
    "COLOMBIA": <span className="fi fi-co"></span>,
    "MEXICO": <span className="fi fi-mx"></span>
}

const countriesLabels =  {
    'BRASIL': 'brasil', 
    'MEXICO': 'méxico', 
    'ARGENTINA': 'argentina', 
    'PERU': 'peru', 
    'CHILE': 'chile', 
    'COLOMBIA': 'colômbia'
}

type CountryKeyFlag = keyof typeof countryFlags

const Country = () => {

const { data: user } = useSelector((state: RootState) => state.auth);
const { currentCountry } = useSelector((state: RootState) => state.country);
const dispatch = useDispatch()

const countries = user?.profile?.countries ?? []
const countriesLength = countries.length - 1


const handleCountry = (country: any) => {
        dispatch(CountryActions.setCountry(country.description))
}

const setDefaultContry = () => {
    
    if(user) {
        if(user?.profile?.countries?.length > 0 ) {

            if(!currentCountry) {
                dispatch(CountryActions.setCountry(user?.profile.countries[0].description))
                return
            }

            const filteredCountry = user?.profile.countries.find(country => country.description.toUpperCase() === currentCountry?.toUpperCase())           
            if(filteredCountry)
                dispatch(CountryActions.setCountry(filteredCountry.description))
        }
    }
}

useEffect(() => {
    if(user) {
        setDefaultContry()
    }
}, [user])


return (
<div className="country cursor-pointer">
<DropdownMenu>
    {
        countriesLabels[currentCountry as keyof typeof countriesLabels] && (
            <DropdownMenuTrigger asChild>
            <div>
                <div className='flex flex-row items-center'>
                    {countryFlags[currentCountry as CountryKeyFlag]}
                    <span className=" bg-slate-500 text-white rounded-r-sm font-bold text-sm p-[2px] pr-1 uppercase">{countriesLabels[currentCountry as keyof typeof countriesLabels]}</span>
                </div>
            </div>
            </DropdownMenuTrigger>
        )
    }
    <DropdownMenuContent>

    {
    countries.map((country: any, index: number) => {

        return (
            <div className='item-wrapper' key={index.toString()}>  
                <DropdownMenuItem onClick={() => handleCountry(country)}>
                    <div className="item w-full flex gap-1">
                        <span className='flag text-xs'>{country.description.substring(0, 2)}</span>
                        <span className='country font-bold uppercase text-sm'>{countriesLabels[country.description as keyof typeof countriesLabels]}</span>
                    </div>
                </DropdownMenuItem>
                {countriesLength !== index && <DropdownMenuSeparator/>}
            </div>
            )

    })
    }
    
    </DropdownMenuContent>
</DropdownMenu>
</div>
)
}

export default Country;