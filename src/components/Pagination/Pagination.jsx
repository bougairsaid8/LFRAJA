import React from 'react'
import './Pagination.css'

function Pagination({pages,count,setCount}) {

  const prev = () => count > 1 && setCount(count - 1);
  const next = () => count < pages && setCount(count + 1);

  return (
    <div className="pagination">
      <button className="btn_Previous" onClick={prev} disabled={count === 1}>
        Previous
      </button>

      <button onClick={() => setCount(1)} className={count === 1 ? 'active' : ''}>1</button>

      {count > 4 && <span>...</span>}

      {count > 4 && count < pages - 3 && (
        <button className={count === count ? 'active' : ''}>{count}</button>
      )}

      {count <= 4 &&
        [2, 3, 4].map((p) => (
          <button key={p} onClick={() => setCount(p)} className={count === p ? 'active' : ''}>
            {p}
          </button>
        ))}

      {count >= pages - 3 &&
        [ pages - 3, pages - 2, pages - 1].map((p) => (
          <button key={p} onClick={() => setCount(p)} className={count === p ? 'active' : ''}>
            {p}
          </button>
        ))}

      {count < pages - 3 && <span>...</span>}

      <button onClick={() => setCount(pages)} className={count === pages ? 'active' : ''}>{pages}</button>

      <button className="btn_next" onClick={next} disabled={count === pages}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
