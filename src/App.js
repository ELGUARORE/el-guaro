import React, { useState, useEffect } from 'react';
import './App.css';

const productos = [
  { nombre: "CORONITAS UNID", mesa: 4000, llevar: 3500 },
  { nombre: "CORONITA X CAJA", mesa: 67000, llevar: 62000 },
  { nombre: "POKER X UNI", mesa: 4000, llevar: 3500 },
  { nombre: "POKER X CAJA", mesa: 70000 },
  { nombre: "LIGTH X UNID", mesa: 4000, llevar: 3500 },
  { nombre: "LUGTH X CAJA", mesa: 70000 },
  { nombre: "AGUILA UNID", mesa: 4000, llevar: 3500 },
  { nombre: "AGUILA X CAJAS", mesa: 70000 },
  { nombre: "CLUB COLOMB UNID", mesa: 4000, llevar: 3500 },
  { nombre: "CLUB COL X CAJAS", mesa: 72000 },
  { nombre: "BUDWEISER UNID", mesa: 4000, llevar: 3500 },
  { nombre: "BUDWEISER X CAJAS", mesa: 53000 },
  { nombre: "COSTEÑA X UNIDAD", mesa: 4000, llevar: 3500 },
  { nombre: "COSTEÑA X CAJAS", mesa: 59000 },
  { nombre: "SOLX UNIDADES", mesa: 4000, llevar: 3500 },
  { nombre: "SOL X CAJAS", mesa: 53000 },
  { nombre: "LATA CORONA X UNI", mesa: 4000, llevar: 3500 },
  { nombre: "LATA CORONA X CAJ", mesa: 72000 },
  { nombre: "HEINKEN X UNIDADE", mesa: 4000, llevar: 3500 },
  { nombre: "HEINEKEN X CAJA", mesa: 59000 },
  { nombre: "STELLA X UNIDADES", mesa: 7000 },
  { nombre: "STELLA X CAJA", mesa: 100000 },
  { nombre: "COLA Y POLA", mesa: 3000 },
  { nombre: "lucky azul", mesa: 7000, llevar: 1000 },
  { nombre: "lucky verde", mesa: 7000, llevar: 1000 },
  { nombre: "bellmont", mesa: 7000, llevar: 1000 },
  { nombre: "AGUA GRANDE", mesa: 3000 },
  { nombre: "AGUA PEQUEÑA", mesa: 2000 },
  { nombre: "GATORADE", mesa: 4000 },
  { nombre: "SODA", mesa: 3000 },
  { nombre: "REDBULL", mesa: 9000 },
  { nombre: "ELECTROLIT", mesa: 9000 },
  { nombre: "COCACOLA 400", mesa: 3000, llevar: 2500 },
  { nombre: "BUCHA MASTER 750", mesa: 160000 },
  { nombre: "BUCHA MASTER 1L", mesa: 220000 },
  { nombre: "BUCHA DELUXE 750", mesa: 140000 },
  { nombre: "BUCHA DELUXE 375", mesa: 90000 },
  { nombre: "BUCHA 18 AÑO", mesa: 330000 },
  { nombre: "BUCHA TWO SOULD", mesa: 190000 },
  { nombre: "BUCHA MALTA", mesa: 220000 },
  { nombre: "OLD PARR 750", mesa: 135000 },
  { nombre: "BLACK AND WHITE 700", mesa: 50000 },
  { nombre: "BLACK AND WHITE 375", mesa: 30000 },
  { nombre: "BAYLES 375", mesa: 36000 },
  { nombre: "BAYLES 700", mesa: 66000 },
  { nombre: "SELLO NEGRO 700", mesa: 135000 },
  { nombre: "SMIRNOF LULO", mesa: 45000 },
  { nombre: "SMIRNOF ROJO 700", mesa: 82000 },
  { nombre: "SMIRNOF ICE VERDE", mesa: 8000 },
  { nombre: "SMIRNOF ICE ROJO", mesa: 8000 },
  { nombre: "DON JULIO 70", mesa: 390000 },
  { nombre: "DON JULIO AÑEJO", mesa: 290000 },
  { nombre: "DON JULIO REPOSADO", mesa: 265000 },
  { nombre: "DON JULIO BLANCO", mesa: 225000 },
  { nombre: "SELLO ROJO 750", mesa: 68000 },
  { nombre: "BACARDI MOJITO", mesa: 45000 },
  { nombre: "JOSE CUERVO ESPECIAL", mesa: 84000 },
  { nombre: "JOSE CUERVO REPOSADO", mesa: 83000 },
  { nombre: "MONTESKAYA", mesa: 42000 },
  { nombre: "AGUA.AMARILLO 750", mesa: 44000, llevar: 42000 },
  { nombre: "AGUA.AMARILLO 375", mesa: 24000 },
  { nombre: "AGUA.TA AZUL 375", mesa: 23000 },
  { nombre: "AGUA.TA AZUL 750", mesa: 42000, llevar: 40000 },
  { nombre: "AGUA.TA AZUL 1000", mesa: 55000 },
  { nombre: "AGUA.TA AZUL 2000", mesa: 110000 },
  { nombre: "AGUA.TA VERD 375", mesa: 23000 },
  { nombre: "AGUA.TA VERD 750", mesa: 38000 },
  { nombre: "AGUA.TA VERD 1000", mesa: 49000 },
  { nombre: "RON MEDELLIN 3 AÑOS 375", mesa: 23000 },
  { nombre: "RON MEDELLIN 3 AÑOS 750", mesa: 44000 },
  { nombre: "RON MEDELLIN 3 AÑOS 1000", mesa: 50000 },
  { nombre: "RON MEDELLIN 3 AÑOS 2000", mesa: 110000 },
  { nombre: "RON MEDELLIN DORADO 375", mesa: 28000 },
];

const mesas = Array.from({ length: 10 }, (_, i) => i + 1);

// --- ESTILOS VISUALES ---
const primaryColor = '#2c3e50';
const secondaryColor = '#3498db';
const accentColor = '#e67e22';
const backgroundColor = '#ecf0f1';
const gradientBackground = `linear-gradient(135deg, ${backgroundColor} 0%, #ffffff 100%)`;

const buttonStyle = {
    backgroundColor: primaryColor,
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    margin: '5px 0',
    width: 'auto',
};

const selectStyle = {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #bdc3c7',
    backgroundColor: 'white',
};

const inputStyle = {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #bdc3c7',
    marginRight: '10px',
    flexGrow: 1,
};

const quantityInputStyle = {
    width: '50px',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #bdc3c7',
    marginRight: '10px',
    textAlign: 'center',
};

const cardStyle = {
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
};
// --- FIN DE ESTILOS ---

function App() {
    const [mesaSeleccionada, setMesaSeleccionada] = useState(1);
    const [tipoConsumo, setTipoConsumo] = useState('mesa');
    const [pedidos, setPedidos] = useState({});
    const [historial, setHistorial] = useState([]);
    const [contabilidad, setContabilidad] = useState(() => {
        try {
            const data = localStorage.getItem('contabilidad');
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error("Error al leer la contabilidad de localStorage", error);
            return [];
        }
    });
    const [vista, setVista] = useState('pedidos');
    const [comentarios, setComentarios] = useState({});
    const [cantidades, setCantidades] = useState({});
    const [metodoPago, setMetodoPago] = useState('efectivo');
    const [busqueda, setBusqueda] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    useEffect(() => {
        try {
            const guardados = localStorage.getItem('historialPedidos');
            if (guardados) {
                setHistorial(JSON.parse(guardados));
            }
        } catch (error) {
            console.error("Error al leer el historial de localStorage", error);
            setHistorial([]);
        }
    }, []);

    const formatCurrency = (number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
        }).format(number);
    };

    const handleCantidadChange = (nombreProducto, cantidad) => {
        const valor = parseInt(cantidad, 10);
        setCantidades(prevCantidades => ({
            ...prevCantidades,
            [nombreProducto]: valor > 0 ? valor : 1,
        }));
    };

    const agregarProductoAlPedido = (producto, cantidad) => {
        const keyDeMesa = `mesa${mesaSeleccionada}`;
        const comentario = comentarios[producto.nombre] || "";
        const precioUnitario = tipoConsumo === 'mesa' ? producto.mesa : (producto.llevar ?? producto.mesa);

        const nuevaLineaPedido = {
            id: Date.now(), // ID único para esta línea de pedido específica
            nombre: producto.nombre,
            cantidad: cantidad,
            precioUnitario: precioUnitario,
            comentario: comentario,
        };

        setPedidos(prevPedidos => {
            const pedidoMesaActual = prevPedidos[keyDeMesa] || [];
            return {
                ...prevPedidos,
                [keyDeMesa]: [...pedidoMesaActual, nuevaLineaPedido]
            };
        });

        // Limpiar campos
        setComentarios(prev => ({ ...prev, [producto.nombre]: '' }));
        setCantidades(prev => ({ ...prev, [producto.nombre]: 1 }));
    };

    const eliminarLineaDelPedido = (idLinea) => {
        const keyDeMesa = `mesa${mesaSeleccionada}`;
        setPedidos(prevPedidos => {
            const pedidoMesaActual = prevPedidos[keyDeMesa] || [];
            const pedidoActualizado = pedidoMesaActual.filter(item => item.id !== idLinea);
            return {
                ...prevPedidos,
                [keyDeMesa]: pedidoActualizado,
            };
        });
    };
    
    const calcularTotal = () => {
        const keyDeMesa = `mesa${mesaSeleccionada}`;
        const pedidoMesa = pedidos[keyDeMesa] || [];
        return pedidoMesa.reduce((total, item) => {
            return total + (item.cantidad * item.precioUnitario);
        }, 0);
    };

    const guardarPedido = () => {
        const keyDeMesa = `mesa${mesaSeleccionada}`;
        const pedidoAGuardar = pedidos[keyDeMesa] || [];
        if (pedidoAGuardar.length === 0) return;

        const total = calcularTotal();
        const nuevoRegistro = {
            mesa: mesaSeleccionada,
            pedido: pedidoAGuardar,
            total,
            metodoPago,
            fecha: new Date().toISOString(),
        };

        const nuevoHistorial = [...historial, nuevoRegistro];
        setHistorial(nuevoHistorial);
        localStorage.setItem('historialPedidos', JSON.stringify(nuevoHistorial));

        setPedidos(prev => {
            const nuevosPedidos = { ...prev };
            delete nuevosPedidos[keyDeMesa];
            return nuevosPedidos;
        });
        setMetodoPago('efectivo');
        alert('Pedido guardado correctamente');
    };

    const finalizarDia = () => {
        if (historial.length === 0) {
            alert('No hay pedidos finalizados para generar el resumen del día.');
            return;
        }

        const resumenProductos = {};
        let totalVendido = 0;
        const totalesPorMetodoPago = { efectivo: 0, tarjeta: 0, transferencia: 0 };

        historial.forEach(registro => {
            registro.pedido.forEach(item => {
                resumenProductos[item.nombre] = (resumenProductos[item.nombre] || 0) + item.cantidad;
            });
            totalVendido += registro.total;
            if (totalesPorMetodoPago[registro.metodoPago] !== undefined) {
                totalesPorMetodoPago[registro.metodoPago] += registro.total;
            }
        });

        const resumenDia = {
            fecha: new Date().toISOString(),
            productos: resumenProductos,
            totalGeneral: totalVendido,
            totalesPorMetodo: totalesPorMetodoPago,
            historialCompleto: historial,
        };

        const nuevaContabilidad = [...contabilidad, resumenDia];
        setContabilidad(nuevaContabilidad);
        localStorage.setItem('contabilidad', JSON.stringify(nuevaContabilidad));

        setHistorial([]);
        localStorage.removeItem('historialPedidos');
        alert('Día finalizado. El resumen se ha guardado en la sección de Contabilidad.');
    };

    const productosFiltrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    
    const contabilidadFiltrada = contabilidad.filter(dia => {
        if (!fechaInicio || !fechaFin) return true;
        const fechaDia = new Date(dia.fecha);
        const inicio = new Date(fechaInicio);
        inicio.setHours(0, 0, 0, 0);
        const fin = new Date(fechaFin);
        fin.setHours(23, 59, 59, 999);
        return fechaDia >= inicio && fechaDia <= fin;
    });

    const resumenPeriodo = contabilidadFiltrada.reduce((acc, dia) => {
        acc.totalGeneral += dia.totalGeneral;
        acc.totalesPorMetodo.efectivo += dia.totalesPorMetodo.efectivo;
        acc.totalesPorMetodo.tarjeta += dia.totalesPorMetodo.tarjeta;
        acc.totalesPorMetodo.transferencia += dia.totalesPorMetodo.transferencia;
        
        Object.entries(dia.productos).forEach(([nombre, cantidad]) => {
            acc.productos[nombre] = (acc.productos[nombre] || 0) + cantidad;
        });
        return acc;
    }, {
        totalGeneral: 0,
        totalesPorMetodo: { efectivo: 0, tarjeta: 0, transferencia: 0 },
        productos: {}
    });

    const keyDeMesa = `mesa${mesaSeleccionada}`;

    return (
        <div className="App" style={{ background: gradientBackground, minHeight: '100vh', padding: '20px', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
            <header style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h1 style={{ color: primaryColor, fontSize: '2.5rem', fontWeight: 'bold' }}>Sistema El Guaro 🍻</h1>
            </header>

            <main style={{ display: 'flex', gap: '30px', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
                <nav style={{ width: '200px', flexShrink: 0 }}>
                    <div style={{ ...cardStyle }}>
                        <h2 style={{ color: primaryColor, borderBottom: `2px solid ${secondaryColor}`, paddingBottom: '10px', marginBottom: '15px' }}>Menú</h2>
                        <button style={{ ...buttonStyle, width: '100%', backgroundColor: vista === 'pedidos' ? secondaryColor : primaryColor }} onClick={() => setVista('pedidos')}>Pedidos</button>
                        <button style={{ ...buttonStyle, width: '100%', backgroundColor: vista === 'finalizados' ? secondaryColor : primaryColor }} onClick={() => setVista('finalizados')}>Finalizados</button>
                        <button style={{ ...buttonStyle, width: '100%', backgroundColor: vista === 'contabilidad' ? secondaryColor : primaryColor }} onClick={() => setVista('contabilidad')}>Contabilidad</button>
                    </div>
                </nav>

                <div style={{ flex: 1 }}>
                    {vista === 'pedidos' && (
                        <div style={{ display: 'flex', gap: '30px' }}>
                            {/* Columna de Productos */}
                            <div style={{ flex: 2, ...cardStyle }}>
                                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
                                    <label>
                                        Mesa:
                                        <select
                                            value={mesaSeleccionada}
                                            onChange={(e) => setMesaSeleccionada(Number(e.target.value))}
                                            style={{ ...selectStyle, marginLeft: '10px' }}
                                        >
                                            {mesas.map((mesa) => (
                                                <option key={mesa} value={mesa}>Mesa {mesa}</option>
                                            ))}
                                        </select>
                                    </label>
                                    <label>
                                        Tipo:
                                        <select
                                            value={tipoConsumo}
                                            onChange={(e) => setTipoConsumo(e.target.value)}
                                            style={{ ...selectStyle, marginLeft: '10px' }}
                                        >
                                            <option value="mesa">Mesa</option>
                                            <option value="llevar">Para llevar</option>
                                        </select>
                                    </label>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Buscar producto..."
                                    value={busqueda}
                                    onChange={e => setBusqueda(e.target.value)}
                                    style={{ width: 'calc(100% - 22px)', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }}
                                />
                                <ul style={{ listStyle: 'none', padding: 0, maxHeight: '60vh', overflowY: 'auto' }}>
                                    {productosFiltrados.map((prod) => (
                                        <li key={prod.nombre} style={{ borderBottom: '1px solid #ecf0f1', padding: '15px 5px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <strong style={{ color: primaryColor }}>{prod.nombre}</strong>
                                                <span>{formatCurrency(tipoConsumo === 'mesa' ? prod.mesa : (prod.llevar ?? prod.mesa))}</span>
                                            </div>
                                            <div style={{ display: 'flex', marginTop: '10px', alignItems: 'center' }}>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={cantidades[prod.nombre] || 1}
                                                    onChange={(e) => handleCantidadChange(prod.nombre, e.target.value)}
                                                    style={quantityInputStyle}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Comentario (opcional)"
                                                    value={comentarios[prod.nombre] || ""}
                                                    onChange={(e) =>
                                                        setComentarios((prev) => ({
                                                            ...prev,
                                                            [prod.nombre]: e.target.value,
                                                        }))
                                                    }
                                                    style={inputStyle}
                                                />
                                                <button style={{...buttonStyle}} onClick={() => agregarProductoAlPedido(prod, cantidades[prod.nombre] || 1)}>Agregar</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Columna de Pedido Actual */}
                            <div style={{ flex: 1, ...cardStyle }}>
                                <h3 style={{ color: secondaryColor, borderBottom: '2px solid #ecf0f1', paddingBottom: '10px', marginBottom: '15px' }}>Pedido Mesa {mesaSeleccionada}</h3>
                                <ul style={{ listStyle: 'none', padding: 0, maxHeight: '50vh', overflowY: 'auto' }}>
                                    {(pedidos[keyDeMesa] || []).map((item) => (
                                        <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px dashed #ccc' }}>
                                            <div>
                                                <strong style={{display: 'block'}}>{item.nombre} x{item.cantidad}</strong>
                                                <span style={{color: '#7f8c8d'}}>{formatCurrency(item.precioUnitario * item.cantidad)}</span>
                                                {item.comentario && <em style={{ display: 'block', color: '#7f8c8d', fontSize: '0.9em' }}>"{item.comentario}"</em>}
                                            </div>
                                            <button onClick={() => eliminarLineaDelPedido(item.id)} style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', flexShrink: 0 }}>X</button>
                                        </li>
                                    ))}
                                    {(pedidos[keyDeMesa] || []).length === 0 && (
                                        <p style={{ color: '#95a5a6' }}>Agrega productos al pedido...</p>
                                    )}
                                </ul>
                                <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '2px solid #ecf0f1' }}>
                                    <h4 style={{ color: primaryColor, fontSize: '1.5rem', marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                                        <span>Total:</span>
                                        <span>{formatCurrency(calcularTotal())}</span>
                                    </h4>
                                    <label style={{ display: 'block', marginBottom: '15px' }}>
                                        Método de Pago:
                                        <select
                                            value={metodoPago}
                                            onChange={(e) => setMetodoPago(e.target.value)}
                                            style={{ ...selectStyle, marginLeft: '10px', width: 'calc(100% - 150px)' }}
                                        >
                                            <option value="efectivo">Efectivo</option>
                                            <option value="tarjeta">Tarjeta</option>
                                            <option value="transferencia">Transferencia</option>
                                        </select>
                                    </label>
                                    <button onClick={guardarPedido} style={{ ...buttonStyle, width: '100%', backgroundColor: '#27ae60', fontSize: '1.1rem' }}>
                                        Finalizar y Guardar Pedido
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {vista === 'finalizados' && (
                        <div style={cardStyle}>
                            <h2 style={{ color: secondaryColor }}>Pedidos Finalizados del Día</h2>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {historial.map((registro, index) => (
                                    <li key={index} style={{ marginBottom: '15px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#fafafa', textAlign: 'left' }}>
                                        <strong>Mesa {registro.mesa}</strong> ({new Date(registro.fecha).toLocaleTimeString()}) - Total: <strong>{formatCurrency(registro.total)}</strong> - Pago: {registro.metodoPago}
                                        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px' }}>
                                            {registro.pedido.map((item) => (
                                                <li key={item.id}>{item.nombre} (x{item.cantidad}) - {formatCurrency(item.precioUnitario * item.cantidad)}</li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                            <button onClick={finalizarDia} style={{ ...buttonStyle, width: '100%', backgroundColor: accentColor, fontSize: '1.1rem', marginTop: '20px' }}>
                                Finalizar Día y Guardar en Contabilidad
                            </button>
                        </div>
                    )}

                    {vista === 'contabilidad' && (
                        <div style={cardStyle}>
                            <h2 style={{ color: secondaryColor }}>Historial de Contabilidad</h2>
                            
                            <div style={{display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px'}}>
                                <label>
                                    Desde:
                                    <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} style={{...selectStyle, marginLeft: '10px'}} />
                                </label>
                                <label>
                                    Hasta:
                                    <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} style={{...selectStyle, marginLeft: '10px'}} />
                                </label>
                            </div>

                            <div style={{marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '5px', textAlign: 'left'}}>
                                <h3>Resumen del Período Seleccionado</h3>
                                <p><strong>Total General Vendido: {formatCurrency(resumenPeriodo.totalGeneral)}</strong></p>
                                <h4>Ventas por Método de Pago:</h4>
                                <ul style={{ listStyleType: 'none', padding: 0 }}>
                                    <li>Efectivo: {formatCurrency(resumenPeriodo.totalesPorMetodo.efectivo)}</li>
                                    <li>Tarjeta: {formatCurrency(resumenPeriodo.totalesPorMetodo.tarjeta)}</li>
                                    <li>Transferencia: {formatCurrency(resumenPeriodo.totalesPorMetodo.transferencia)}</li>
                                </ul>
                                <h4>Total de Productos Vendidos:</h4>
                                <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                                    {Object.entries(resumenPeriodo.productos).map(([nombre, cantidad]) => (
                                        <li key={nombre}>{nombre}: {cantidad} uni.</li>
                                    ))}
                                </ul>
                            </div>

                            {contabilidadFiltrada.map((dia, index) => (
                                <div key={index} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px', textAlign: 'left' }}>
                                    <h3>Resumen del día: {new Date(dia.fecha).toLocaleDateString('es-CO')}</h3>
                                    <p><strong>Total Vendido: {formatCurrency(dia.totalGeneral)}</strong></p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default App;

