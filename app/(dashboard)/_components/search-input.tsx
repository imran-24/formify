import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import qs from 'query-string';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

const SearchInput = () => {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const debouncedValue = useDebounceValue(search, 500);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: "/",
            query: {
                search: debouncedValue[0]
            }
        }, {skipEmptyString: true, skipNull: true});
        router.push(url);
    },[debouncedValue, router]);

  return (
    <div className='relative flex items-center max-w-[420px] lg:max-w-[580px]  mx-auto'>
        <div className='absolute left-5 z-50'>
            <Search className='size-5 text-primary/80' />
        </div>
        <Input onChange={handleChange} className=' placeholder:text-primary/80 border-none rounded-full p-6 pl-14 text-[16px]  bg-slate-100 focus-visible:bg-white transition    focus-visible:ring-0 focus-visible:ring-offset-0  focus-visible:drop-shadow-md' placeholder='Search'  />
    </div>
  )
}

export default SearchInput