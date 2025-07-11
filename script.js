
const startForm = document.getElementById('startForm')
const mainApp = document.getElementById('mainApp')
const summary = document.getElementById('summary')
const productForm = document.getElementById('productForm')
const productsTableBody = document.querySelector('#productsTable tbody')

let products = []
let compraId = null // ID da compra criada no Firestore

startForm.addEventListener('submit', async e => {
  e.preventDefault()

  const date = document.getElementById('date').value
  const market = document.getElementById('market').value.trim()

  if (!date || !market) {
    alert('Por favor, preencha a data e o supermercado.')
    return
  }

  try {
    // Cria um novo documento da compra no Firestore
    const docRef = await db.collection('compras').add({
      date,
      market,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })

    compraId = docRef.id

    // Mostra o formulário principal
    startForm.classList.add('hidden')
    mainApp.classList.remove('hidden')

  } catch (error) {
    alert('Erro ao iniciar a compra: ' + error.message)
  }
})

productForm.addEventListener('submit', async e => {
  e.preventDefault()

  if (!compraId) {
    alert('Erro: compra ainda não iniciada.')
    return
  }

  const name = document.getElementById('productName').value.trim()
  const brand = document.getElementById('brand').value.trim()
  const quantity = parseInt(document.getElementById('quantity').value)
  const unitPrice = parseFloat(document.getElementById('unitPrice').value)

  if (!name || !brand || quantity <= 0 || unitPrice <= 0) {
    alert('Preencha todos os campos corretamente.')
    return
  }

  const totalPrice = quantity * unitPrice
  const produto = { name, brand, quantity, unitPrice, totalPrice }

  try {
    // Adiciona o produto ao subcoleção 'produtos' da compra
    await db.collection('compras').doc(compraId).collection('produtos').add(produto)

    // Atualiza UI local
    products.push(produto)
    updateUI()

    productForm.reset()
    document.getElementById('quantity').value = 1
    document.getElementById('unitPrice').value = '0.00'

  } catch (error) {
    alert('Erro ao salvar produto: ' + error.message)
  }
})

function updateUI() {
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

  const totalQuantity = products.reduce((acc, prod) => acc + prod.quantity, 0)
  const totalValue = products.reduce((acc, prod) => acc + prod.totalPrice, 0)

  summary.textContent = `Produtos adicionados: ${totalQuantity} | Valor total: R$ ${totalValue.toFixed(2)}`
}
