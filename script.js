const startForm = document.getElementById('startForm')
    const mainApp = document.getElementById('mainApp')
    const summary = document.getElementById('summary')
    const productForm = document.getElementById('productForm')
    const productsTableBody = document.querySelector('#productsTable tbody')

    let products = []

    startForm.addEventListener('submit', e => {
      e.preventDefault()

      const date = document.getElementById('date').value
      const market = document.getElementById('market').value.trim()

      if (!date || !market) {
        alert('Por favor, preencha a data e o supermercado.')
        return
      }

      // Esconde o form inicial e mostra o app principal
      startForm.classList.add('hidden')
      mainApp.classList.remove('hidden')
    })

    productForm.addEventListener('submit', e => {
      e.preventDefault()

      const name = document.getElementById('productName').value.trim()
      const brand = document.getElementById('brand').value.trim()
      const quantity = parseInt(document.getElementById('quantity').value)
      const unitPrice = parseFloat(document.getElementById('unitPrice').value)

      if (!name || !brand || quantity <= 0 || unitPrice <= 0) {
        alert('Preencha todos os campos corretamente.')
        return
      }

      const totalPrice = quantity * unitPrice

      // Adiciona na lista
      products.push({ name, brand, quantity, unitPrice, totalPrice })

      // Atualiza a tabela e resumo
      updateUI()

      // Limpa os campos
      productForm.reset()
      document.getElementById('quantity').value = 1
      document.getElementById('unitPrice').value = '0.00'
    })

    function updateUI() {
      // Atualiza tabela
      productsTableBody.innerHTML = ''
      products.forEach(prod => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
          <td>${prod.name}</td>
          <td>${prod.brand}</td>
          <td>${prod.quantity}</td>
          <td>R$ ${prod.unitPrice.toFixed(2)}</td>
          <td>R$ ${prod.totalPrice.toFixed(2)}</td>
        `
        productsTableBody.appendChild(tr)
      })

      // Atualiza resumo (quantidade total e valor total)
      const totalQuantity = products.reduce((acc, prod) => acc + prod.quantity, 0)
      const totalValue = products.reduce((acc, prod) => acc + prod.totalPrice, 0)

      summary.textContent = `Produtos adicionados: ${totalQuantity} | Valor total: R$ ${totalValue.toFixed(2)}`
    }