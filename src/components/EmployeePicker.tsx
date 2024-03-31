import { createSelectInputQueryString } from '@/helpers/createQueryString';
import { validateEmployee } from '@/helpers/validateSearchParams';
import { useSearchParams } from 'next/navigation';
import { Contact } from 'lucide-react';
import { User } from '@/lib/schemas';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const EmployeePicker = ({ employees }: { employees: User[] }) => {
  const searchParams = useSearchParams();
  const validEmployees = employees.map(({ name }) => name);
  const employee = validateEmployee(searchParams.get('employee'), validEmployees, validEmployees[0]);

  return (
    <div className='flex w-full flex-col gap-2 max-md:w-full'>
      <Select
        onValueChange={(employee) =>
          createSelectInputQueryString({ inputKey: 'employee', selectInput: employee, searchParams })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder='Escolha do Profissional' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {employees.map((employeeOption) => {
              return (
                <SelectItem key={employeeOption.name} value={employeeOption.name}>
                  {employeeOption.name === employee ? (
                    <div className='flex gap-2'>
                      <Contact className='size-5' />
                      {employeeOption.name}
                    </div>
                  ) : (
                    employeeOption.name
                  )}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
