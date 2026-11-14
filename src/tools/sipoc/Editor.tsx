"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EditableStringList } from "@/components/tools/editable-string-list";
import type { EditorProps } from "@/tools/_types";
import type { SipocData } from "./schema";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function Editor({ data, onChange, warnings }: EditorProps<SipocData>) {
  return (
    <div className="flex flex-col gap-6">
      {warnings.length > 0 && (
        <div className="flex flex-col gap-1 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          {warnings.map((w) => (
            <p key={w.code}>⚠ {w.message}</p>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <EditableStringList
          label="Proveedores"
          items={data.proveedores}
          onChange={(proveedores) => onChange({ ...data, proveedores })}
          placeholder="Quién provee la entrada"
        />
        <EditableStringList
          label="Clientes"
          items={data.clientes}
          onChange={(clientes) => onChange({ ...data, clientes })}
          placeholder="Quién recibe la salida"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Entradas</Label>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Entrada</TableHead>
                <TableHead>Requisito</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.entradas.map((e, i) => (
                <TableRow key={e.id}>
                  <TableCell>
                    <Input
                      value={e.entrada}
                      onChange={(ev) => {
                        const next = [...data.entradas];
                        next[i] = { ...e, entrada: ev.target.value };
                        onChange({ ...data, entradas: next });
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={e.requisito}
                      onChange={(ev) => {
                        const next = [...data.entradas];
                        next[i] = { ...e, requisito: ev.target.value };
                        onChange({ ...data, entradas: next });
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        onChange({ ...data, entradas: data.entradas.filter((_, idx) => idx !== i) })
                      }
                    >
                      Quitar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-fit"
          onClick={() =>
            onChange({
              ...data,
              entradas: [...data.entradas, { id: uid(), entrada: "", requisito: "" }],
            })
          }
        >
          + Agregar entrada
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Proceso (5-6 pasos de alto nivel)</Label>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Paso</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.proceso.map((p, i) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <Input
                      value={p.paso}
                      onChange={(ev) => {
                        const next = [...data.proceso];
                        next[i] = { ...p, paso: ev.target.value };
                        onChange({ ...data, proceso: next });
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        onChange({ ...data, proceso: data.proceso.filter((_, idx) => idx !== i) })
                      }
                    >
                      Quitar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-fit"
          onClick={() => onChange({ ...data, proceso: [...data.proceso, { id: uid(), paso: "" }] })}
        >
          + Agregar paso
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Salidas</Label>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Salida</TableHead>
                <TableHead>Requisito</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.salidas.map((s, i) => (
                <TableRow key={s.id}>
                  <TableCell>
                    <Input
                      value={s.salida}
                      onChange={(ev) => {
                        const next = [...data.salidas];
                        next[i] = { ...s, salida: ev.target.value };
                        onChange({ ...data, salidas: next });
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={s.requisito}
                      onChange={(ev) => {
                        const next = [...data.salidas];
                        next[i] = { ...s, requisito: ev.target.value };
                        onChange({ ...data, salidas: next });
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        onChange({ ...data, salidas: data.salidas.filter((_, idx) => idx !== i) })
                      }
                    >
                      Quitar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-fit"
          onClick={() =>
            onChange({ ...data, salidas: [...data.salidas, { id: uid(), salida: "", requisito: "" }] })
          }
        >
          + Agregar salida
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label>Límite de inicio</Label>
          <Input
            value={data.limite_inicio}
            placeholder="Primer paso dentro del alcance"
            onChange={(e) => onChange({ ...data, limite_inicio: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Límite de fin</Label>
          <Input
            value={data.limite_fin}
            placeholder="Último paso dentro del alcance"
            onChange={(e) => onChange({ ...data, limite_fin: e.target.value })}
          />
        </div>
      </div>

      <EditableStringList
        label="Xs preliminares (opcional)"
        items={data.xs_preliminares}
        onChange={(xs_preliminares) => onChange({ ...data, xs_preliminares })}
        placeholder="Variable de entrada que podría explicar la Y"
      />
    </div>
  );
}
