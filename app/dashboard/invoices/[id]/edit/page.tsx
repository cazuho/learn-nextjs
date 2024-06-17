// フォルダ名を[]で囲むと、その部分が動的なパスとして扱われる
// この場合、/dashboard/invoices/{請求書のUUID}/edit といったURLが作成される

import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edit Invoice',
};

// 新規作成ページとほとんど同じだが、あらかじめ入力された請求書の情報を表示する点が異なる
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers(),
    ]);

    // 請求書が見つからない場合の処理
    if (!invoice) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Invoices', href: '/dashboard/invoices' },
                    {
                        label: 'Edit Invoice',
                        href: `/dashboard/invoices/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form invoice={invoice} customers={customers} />
        </main>
    );
}