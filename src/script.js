window.addEventListener('load', () => {
    // RENDER TABLE
    function renderTable() {
        fetch('/urls')
            .then(response => response.json())
            .then(data => {
                const tbody = document.getElementById('table-body');
                tbody.innerHTML = '';

                data.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.id}</td>
                        <td>${item.url}</td>
                        <td>${item.description}</td>
                        <td>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-danger btn-delete" data-id="${item.id}">Excluir</button>
                            </div>
                        </td>
                    `;
                    tbody.appendChild(row);
                });

                // EventListener DELETE buttons
                const btnsDelete = document.querySelectorAll('.btn-delete');
                btnsDelete.forEach(btn => {
                    btn.addEventListener('click', () => {
                        const id = btn.getAttribute('data-id');
                        deleteUrl(id);
                    });
                });
            })
            .catch(error => console.error('Error:', error));
    }

    // DELETE data
    function deleteUrl(id) {
        fetch(`/urls/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error');
            }
            // RenderTable after delete data
            renderTable();
        })
        .catch(error => console.error('Error:', error));
    }

    // POST new data
    function newUrl(url, description) {
        fetch('/urls', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url, description })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error');
            }
            // Render table after new data
            renderTable();
        })
        .catch(error => console.error('Error:', error));
    }

    // Form Ref
    const formNewUrl = document.getElementById('form-new-url');

    // EventListener to send form
    formNewUrl.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(formNewUrl);
        const url = formData.get('url');
        const description = formData.get('description');
        newUrl(url, description);

        // Clear form after add
        formNewUrl.reset();
    });

    // RenderTable on first load webpage
    renderTable();
});
