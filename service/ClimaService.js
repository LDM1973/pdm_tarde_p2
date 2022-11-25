import axios from 'axios'
const endpointClima = '/fatec_ipi_20222_pdm_tarde_historico_previsoes/'
const base = axios.create({
    baseURL: 'https://g3e99fc358a3389-jp1k665t7zehy4vs.adb.us-ashburn-1.oraclecloudapps.com/ords/admin',
    headers: {"Content-Type": "application/json"}
})

export const obterLista = () => {
    return base.get(endpointClima)
}

export const cadastrarClima = (clima) => {
    return base.post(
        endpoinClima,
        clima
    )
}

