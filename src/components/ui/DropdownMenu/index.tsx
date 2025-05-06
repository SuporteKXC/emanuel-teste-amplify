import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { CircleEllipsis } from "lucide-react";
  
type Options = {
    title: string;
    action: () => void;
    disabled?: boolean;
  }

interface Props{
    options: Options[]
}
export const DropdownMenuGs: React.FC<Props> = ({options})=>{

    return <DropdownMenu>
        <DropdownMenuTrigger>
            <CircleEllipsis/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            {options.map((e,index)=>(
                <>
                <DropdownMenuItem key={index} disabled={e.disabled} onClick={()=>e.action()}>
                    {e.title}
                </DropdownMenuItem>
                </>
            ))}
        </DropdownMenuContent>
    </DropdownMenu>
}