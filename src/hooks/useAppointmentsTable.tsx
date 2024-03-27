'use client';

import { formatDate, formatDateGetDay, formatDateGetHour } from '@/utils/date';
import { UpdateAppointmentStatus } from '@/services/UpdateAppointmentStatus';
import { FormattedAppointmentData, Status } from '@/lib/schemas';
import { formatPaymentMethodCaption } from '@/utils/caption';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { formatToCurrency } from '@/utils/number';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Session } from '@/helpers/getSession';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const useAppointmentsTable = (session: Session) => {
  const { refresh } = useRouter();

  const columns: ColumnDef<FormattedAppointmentData>[] = [
    { accessorKey: 'appointmentId' },

    {
      accessorKey: 'haircutName',
      header: 'Corte',
      cell: ({ row }) => <div>{row.getValue('haircutName')}</div>,
    },

    {
      accessorKey: 'haircutPrice',
      header: () => <div>Preço</div>,
      cell: ({ row }) => <div className='font-medium'>{formatToCurrency(row.getValue('haircutPrice'))}</div>,
    },

    {
      accessorKey: 'appointmentDate',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Data
            <ArrowUpDown className='ml-2 h-4 w-4 min-w-4' />
          </Button>
        );
      },
      cell: ({ row }) => (
        <Fragment>
          <div className='max-lg:hidden'>{formatDate(row.getValue('appointmentDate'))}h</div>
          <div className='lg:hidden'>
            {formatDateGetDay(row.getValue('appointmentDate'))} às{' '}
            {formatDateGetHour(row.getValue('appointmentDate'))}h
          </div>
        </Fragment>
      ),
    },

    {
      accessorKey: 'paymentMethod',
      header: () => <div>Método de Pagamento</div>,
      cell: ({ row }) => {
        return <div className='font-medium'>{formatPaymentMethodCaption(row.getValue('paymentMethod'))}</div>;
      },
    },

    {
      accessorKey: 'appointmentStatus',
      header: () => <div>Status</div>,
      cell: ({ row }) => <div className='font-medium'>{row.getValue('appointmentStatus')}</div>,
    },

    {
      accessorKey: 'clientName',
      header: () => <div className='text-right'>Cliente</div>,
      cell: ({ row }) => <div className='text-right font-medium'>{row.getValue('clientName')}</div>,
    },

    {
      accessorKey: 'employeeName',
      header: () => <div className='text-right'>Profissional</div>,
      cell: ({ row }) => <div className='text-right font-medium'>{row.getValue('employeeName')}</div>,
    },

    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const { appointmentId } = row.original;

        const updateAppointmentStatus = async (id: string, status: Status, userId?: string) => {
          const response = await UpdateAppointmentStatus(id, status, userId);
          if (response.status === 'sucess') refresh();
        };

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Abrir Menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(appointmentId)}
                className='cursor-pointer'
              >
                Copiar ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => updateAppointmentStatus(appointmentId, 'PAID', session?.id)}
                className='cursor-pointer'
              >
                Pago
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => updateAppointmentStatus(appointmentId, 'BREAK', session?.id)}
                className='cursor-pointer'
              >
                Almoço
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => updateAppointmentStatus(appointmentId, 'CANCELED', session?.id)}
                className='cursor-pointer'
              >
                Cancelar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => updateAppointmentStatus(appointmentId, 'PENDING', session?.id)}
                className='cursor-pointer'
              >
                Pendente
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return { columns };
};