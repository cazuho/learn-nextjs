// クライアントコンポーネントなので、イベントリスナーとフックを使用できる
'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

// デバウンスを使用し、ユーザーが入力を停止してから特定の時間 (300 ミリ秒) 経過後にのみコードを実行
export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    // URLクエリパラメータを操作するため　
    const params = new URLSearchParams(searchParams);
    // 新しい検索が行われた場合、ページ番号をリセット
    params.set('page', '1');
    // ユーザーの入力に基づいたパラメータ文字列を作成、入力がからならパラメータを削除
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    // 検索バーへの入力をURL に適した形式に変換して、URLを更新
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        // 入力フィールドとURLが同期するようにする
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
