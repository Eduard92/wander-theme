(function() {
    'use strict';

    // ══════════════════════════════════════════
    //  CONFIGURACIÓN
    // ══════════════════════════════════════════
    var COL      = 108;
    var NDAYS    = 28;
    var DAY_H    = 50;
    var UBI_H    = 50;
    var DAYNAMES = ['dom','lun','mar','mié','jue','vie','sáb'];
    var MONTHS   = ['enero','febrero','marzo','abril','mayo','junio',
                    'julio','agosto','septiembre','octubre','noviembre','diciembre'];
    var COLORS   = ['#2d8a6e','#3b82f6','#8b5cf6','#ec4899','#f59e0b',
                    '#06b6d4','#84cc16','#ef4444','#6366f1','#14b8a6',
                    '#e879f9','#fb923c','#10b981','#f43f5e','#a78bfa'];
    var STATUS   = {
        'Confirmada':        { bg:'#dcfce7', c:'#166534', i:'✓' },
        'Modificada':        { bg:'#dbeafe', c:'#1e40af', i:'✎' },
        'Por Revisar':       { bg:'#fef9c3', c:'#854d0e', i:'⏳' },
        'Pendiente Offline': { bg:'#ffedd5', c:'#9a3412', i:'◷' }
    };

    // ══════════════════════════════════════════
    //  ESTADO
    // ══════════════════════════════════════════
    var S = {
        data:      null,
        vStart:    null,
        today:     (function(){ var n=new Date(); return new Date(n.getFullYear(),n.getMonth(),n.getDate()); })(),
        expanded:  {},
        ubiFilter: '',
        loading:   false,
        firstLoad: true
    };

    S.vStart = addD(S.today, -3);

    // ══════════════════════════════════════════
    //  UTILIDADES
    // ══════════════════════════════════════════
    function addD(d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }
    function diffD(a, b) { return Math.round((b.getTime() - a.getTime()) / 86400000); }
    function same(a, b) { return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }
    function pd(s) { var p = s.split('-'); return new Date(+p[0], +p[1]-1, +p[2]); }
    function pad(n) { return n < 10 ? '0'+n : ''+n; }
    function isoD(d) { return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()); }
    function fmtD(d) { return pad(d.getDate())+'/'+pad(d.getMonth()+1)+'/'+d.getFullYear(); }
    function fmtM(n) { return 'MXN ' + Math.round(n).toLocaleString('es-MX'); }
    function fmtS(n) { return n>=1000 ? (n/1000).toFixed(1).replace('.0','')+'K' : String(n); }
    function gc(id) { return COLORS[id % COLORS.length]; }
    function el(id) { return document.getElementById(id); }
    function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

    // ══════════════════════════════════════════
    //  FETCH DATA
    // ══════════════════════════════════════════
    function fetchData(cb) {
        S.loading = true;
        showLoading();

        var startISO = isoD(S.vStart);
        var endISO   = isoD(addD(S.vStart, NDAYS + 7));

        // En backend de October CMS, $.request() apunta al handler
        // del controller directamente (sin prefijo de componente).
        $.request('onCalendarioGeneral', {
            data: {
                start:     startISO,
                end:       endISO,
                ubicacion: S.ubiFilter || null
            },
            success: function(resp) {
                if (typeof resp === 'string') {
                    try { resp = JSON.parse(resp); } catch(e) { console.error('Parse error', e); }
                }

                S.data = resp;
                S.loading = false;

                if (S.firstLoad && resp && resp.ubicaciones) {
                    resp.ubicaciones.forEach(function(u) { S.expanded[u.id] = true; });
                    S.firstLoad = false;
                }

                renderAll();
                if (cb) cb();
            },
            error: function(err) {
                S.loading = false;
                console.error('Error cargando calendario:', err);
                el('elRows').innerHTML = '<div class="cal-loading" style="color:#ef4444;">Error al cargar datos. <button class="cal-btn cal-btn--sm" onclick="Cal.refresh()" style="margin-left:8px;">Reintentar</button></div>';
            }
        });
    }

    function showLoading() {
        el('elRows').innerHTML     = '<div class="cal-loading"><div class="cal-spinner"></div> Cargando ocupación...</div>';
        el('elSideRows').innerHTML = '';
    }

    // ══════════════════════════════════════════
    //  COMPUTED
    // ══════════════════════════════════════════
    function getDays() {
        var arr = [];
        for (var i = 0; i < NDAYS; i++) arr.push(addD(S.vStart, i));
        return arr;
    }

    function getRows() {
        if (!S.data || !S.data.ubicaciones) return [];
        var rows = [];
        S.data.ubicaciones.forEach(function(u) {
            rows.push({ t: 'u', d: u });
            if (S.expanded[u.id]) {
                (u.cabanas || []).forEach(function(c) {
                    rows.push({ t: 'c', d: c, u: u });
                });
            }
        });
        return rows;
    }

    function getMonthHeaders(days) {
        var h = [], cur = null;
        days.forEach(function(d) {
            var k = d.getFullYear()+'-'+d.getMonth();
            if (k !== cur) { cur = k; h.push({ m: d.getMonth(), y: d.getFullYear(), span: 1 }); }
            else h[h.length-1].span++;
        });
        return h;
    }

    // ══════════════════════════════════════════
    //  RENDER
    // ══════════════════════════════════════════
    function renderAll() {
        var days = getDays();
        var rows = getRows();
        var gw   = days.length * COL;
        renderDate();
        renderUbiSelect();
        renderMonths(days, gw);
        renderDayHeaders(days, gw);
        renderSidebar(rows);
        renderDataRows(rows, days, gw);
        renderStats();
        renderTodayLine(days);
    }

    function renderDate() {
        el('elDate').textContent = fmtD(S.today);
    }

    function renderUbiSelect() {
        if (!S.data || !S.data.ubicaciones) return;
        var h = '<option value="">Todas las ubicaciones</option>';
        S.data.ubicaciones.forEach(function(u) {
            h += '<option value="'+u.id+'"'+(S.ubiFilter == u.id ? ' selected' : '')+'>'+esc(u.nombre)+'</option>';
        });
        el('selUbi').innerHTML = h;
    }

    function renderMonths(days, gw) {
        var mh = getMonthHeaders(days);
        var h = '';
        mh.forEach(function(m) {
            h += '<div class="cal-mcell" style="width:'+(m.span*COL)+'px">'+MONTHS[m.m]+' '+m.y+'</div>';
        });
        var container = el('elMonths');
        container.innerHTML = h;
        container.style.width = gw + 'px';
    }

    function renderDayHeaders(days, gw) {
        var h = '';
        days.forEach(function(d) {
            var isT = same(d, S.today);
            var isW = d.getDay()===0 || d.getDay()===6;
            var cls = 'cal-dcell' + (isT ? ' is-today' : isW ? ' is-wknd' : '');
            h += '<div class="'+cls+'" style="width:'+COL+'px">';
            h += '<span class="cal-dcell-name">'+DAYNAMES[d.getDay()]+'</span>';
            h += '<span class="cal-dcell-num">'+d.getDate()+'</span>';
            h += '</div>';
        });
        var container = el('elDays');
        container.innerHTML = h;
        container.style.width = gw + 'px';
    }

    function renderSidebar(rows) {
        var h = '';
        rows.forEach(function(r) {
            if (r.t === 'u') {
                var u = r.d, isE = S.expanded[u.id];
                h += '<div class="cal-srow cal-srow--ubi" onclick="Cal.toggle('+u.id+')">';
                h += '<span class="cal-ubi-arrow'+(isE ? ' open' : '')+'">&#9654;</span>';
                h += '<div><div class="cal-ubi-name">'+esc(u.nombre)+'</div>';
                h += '<div class="cal-ubi-meta">'+u.cabanas.length+' cab.';
                if (u.guesty) h += '<span class="cal-ubi-guesty">&#9679; Guesty</span>';
                h += '</div></div></div>';
            } else {
                h += '<div class="cal-srow cal-srow--cab"><span class="cal-cab-name">'+esc(r.d.nombre)+'</span></div>';
            }
        });
        el('elSideRows').innerHTML = h;
    }

    function renderDataRows(rows, days, gw) {
        var h = '';

        rows.forEach(function(r) {
            if (r.t === 'u') {
                h += buildUbiRow(r.d, days, gw);
            } else {
                h += buildCabRow(r.d, r.u, days, gw);
            }
        });

        el('elRows').innerHTML = h;
        el('elGrid').style.width = gw + 'px';
    }

    function buildUbiRow(ubi, days, gw) {
        var tc = ubi.cabanas.length;
        var h = '<div class="cal-row cal-row--ubi" style="width:'+gw+'px;height:'+UBI_H+'px">';

        days.forEach(function(d) {
            var oc = 0;
            ubi.cabanas.forEach(function(c) {
                var has = (c.reservaciones || []).some(function(r) {
                    var ci = pd(r.checkin);
                    var co = pd(r.checkout);
                    return d >= ci && d < co;
                });
                if (has) oc++;
            });

            var pct = tc > 0 ? oc / tc : 0;
            var cls = 'cal-occ cal-occ-0';
            if (pct > 0 && pct < 0.5)      cls = 'cal-occ cal-occ-1';
            else if (pct >= 0.5 && pct < 1) cls = 'cal-occ cal-occ-2';
            else if (pct >= 1)              cls = 'cal-occ cal-occ-3';

            var ccls = 'cal-cell' + (same(d, S.today) ? ' is-today' : '');
            h += '<div class="'+ccls+'" style="width:'+COL+'px;height:'+UBI_H+'px">';
            h += '<span class="'+cls+'">'+oc+'/'+tc+'</span>';
            h += '</div>';
        });

        h += '</div>';
        return h;
    }

    function buildCabRow(cab, ubi, days, gw) {
        var reservaciones = cab.reservaciones || [];
        var h = '<div class="cal-row" style="width:'+gw+'px;height:'+DAY_H+'px">';

        days.forEach(function(d) {
            var isCheckin  = false;
            var isCheckout = false;
            var isFull     = false;

            reservaciones.forEach(function(r) {
                var ci = pd(r.checkin);
                var co = pd(r.checkout);
                if (same(d, ci))           isCheckin = true;
                else if (same(d, co))      isCheckout = true;
                else if (d > ci && d < co) isFull = true;
            });

            var isT = same(d, S.today);
            var isW = d.getDay()===0 || d.getDay()===6;
            var ccls = 'cal-cell' + (isT ? ' is-today' : isW ? ' is-wknd' : '');

            h += '<div class="'+ccls+'" style="width:'+COL+'px;height:'+DAY_H+'px">';

            if (!isFull && !isCheckin && !isCheckout) {
                var dow = d.getDay();
                var precio = (cab.precios && cab.precios[dow]) ? cab.precios[dow] : 0;
                if (precio > 0) {
                    h += '<span class="cal-price">'+fmtS(precio)+' MXN</span>';
                }
            }
            h += '</div>';
        });

        // Reservation bars
        reservaciones.forEach(function(res) {
            var ci = pd(res.checkin);
            var co = pd(res.checkout);
            var so = diffD(S.vStart, ci);
            var eo = diffD(S.vStart, co);

            // Check-in empieza a mitad del día (4 PM), checkout a mitad (12 PM)
            var HALF = COL / 2;
            var startPx = so * COL + HALF;
            var endPx   = eo * COL + HALF;

            var visStart = Math.max(0, startPx);
            var visEnd   = Math.min(NDAYS * COL, endPx);
            if (visStart >= visEnd) return;

            var left  = visStart + 3;
            var width = (visEnd - visStart) - 6;
            var color = gc(res.id);
            var st    = STATUS[res.estatus];

            h += '<div class="cal-bar" ';
            h += 'style="left:'+left+'px;width:'+width+'px;height:'+(DAY_H-10)+'px;background:'+color+';" ';
            h += 'onclick="Cal.popup(event,'+res.id+','+cab.id+','+ubi.id+')" ';
            h += 'title="'+esc(res.cliente)+' - '+esc(res.estatus)+'">';

            if (st) h += '<span class="cal-bar-dot" style="background:'+st.c+'"></span>';
            h += '<span class="cal-bar-avatar">'+esc(res.cliente.charAt(0))+'</span>';
            h += '<span class="cal-bar-name">'+esc(res.cliente)+'</span>';
            h += '</div>';
        });

        h += '</div>';
        return h;
    }

    function renderStats() {
        if (!S.data || !S.data.ubicaciones) return;
        var h = '<div class="cal-stats-left">';
        var totalCabs = 0, totalRes = 0;

        S.data.ubicaciones.forEach(function(u) {
            var t = u.cabanas.length;
            totalCabs += t;
            var oc = 0;
            u.cabanas.forEach(function(c) {
                totalRes += (c.reservaciones || []).length;
                var has = (c.reservaciones || []).some(function(r) {
                    return pd(r.checkin) <= S.today && pd(r.checkout) > S.today;
                });
                if (has) oc++;
            });
            var pct = t > 0 ? Math.round(oc/t*100) : 0;
            var bc = pct < 50 ? '#22c55e' : pct < 80 ? '#eab308' : '#ef4444';

            h += '<div class="cal-stat">';
            h += '<span class="cal-stat-name">'+esc(u.nombre)+'</span>';
            h += '<div class="cal-stat-track"><div class="cal-stat-fill" style="width:'+pct+'%;background:'+bc+'"></div></div>';
            h += '<span class="cal-stat-num">'+oc+'/'+t+'</span>';
            h += '</div>';
        });

        h += '</div>';
        h += '<span class="cal-stats-right">'+totalCabs+' cabañas | '+totalRes+' reservaciones en vista</span>';
        el('elStats').innerHTML = h;
    }

    function renderTodayLine(days) {
        var old = document.querySelector('.cal-tline');
        if (old) old.remove();

        var idx = -1;
        days.forEach(function(d, i) { if (same(d, S.today)) idx = i; });
        if (idx < 0) return;

        var line = document.createElement('div');
        line.className = 'cal-tline';
        line.style.left = (idx * COL + COL / 2) + 'px';
        el('elGrid').appendChild(line);
    }

    // ══════════════════════════════════════════
    //  POPUP
    // ══════════════════════════════════════════
    function openPopup(ev, resId, cabId, ubiId) {
        ev.stopPropagation();

        var ubi = null, cab = null, res = null;
        if (S.data && S.data.ubicaciones) {
            ubi = S.data.ubicaciones.find(function(u) { return u.id === ubiId; });
            if (ubi) cab = ubi.cabanas.find(function(c) { return c.id === cabId; });
            if (cab) res = (cab.reservaciones || []).find(function(r) { return r.id === resId; });
        }
        if (!res) return;

        var st    = STATUS[res.estatus] || STATUS['Confirmada'];
        var color = gc(res.id);

        var px = Math.min(ev.clientX, window.innerWidth - 380);
        var py = Math.min(ev.clientY, window.innerHeight - 420);

        var h = '';
        h += '<div class="cal-pop-head" style="background:'+color+'">';
        h += '<span>'+ esc(res.origen || 'Sitio Web') +'</span>';
        h += '<button class="cal-pop-close" onclick="Cal.closePop()">&#10005;</button>';
        h += '</div>';

        h += '<div class="cal-pop-body">';

        h += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">';
        h += '<span class="cal-pop-status" style="background:'+st.bg+';color:'+st.c+'">'+st.i+' '+esc(res.estatus)+'</span>';
        h += '<span style="font-size:12px;color:#6b7280">'+res.noches+' noche'+(res.noches>1?'s':'')+'</span>';
        h += '</div>';

        h += '<div class="cal-pop-dates">';
        h += '<span>'+fmtD(pd(res.checkin))+' 4:00 PM</span>';
        h += '<span style="color:#d1d5db">&#8594;</span>';
        h += '<span>'+fmtD(pd(res.checkout))+' 12:00 PM</span>';
        h += '</div>';

        h += '<div class="cal-pop-info">';
        h += '<span class="cal-pop-icon">&#127968;</span><span>'+(cab ? esc(cab.nombre) : '')+(ubi ? ' - '+esc(ubi.nombre) : '')+'</span>';
        h += '<span class="cal-pop-icon">&#128100;</span><span style="font-weight:600">'+esc(res.cliente)+' | '+res.adultos+' huésped'+(res.adultos>1?'es':'')+'</span>';
        if (res.email)       h += '<span class="cal-pop-icon">&#9993;</span><span style="font-size:12px;color:#6b7280">'+esc(res.email)+'</span>';
        if (res.telefono)    h += '<span class="cal-pop-icon">&#9742;</span><span style="font-size:12px;color:#6b7280">'+esc(res.telefono)+'</span>';
        h += '<span class="cal-pop-icon">&#128176;</span><div><span style="font-weight:700">'+fmtM(res.costo_total)+'</span>';
        if (res.descuento > 0) h += '<span style="font-size:11px;color:#ef4444;margin-left:6px">(-'+fmtM(res.descuento)+')</span>';
        h += '</div>';
        if (res.metodo_pago) h += '<span class="cal-pop-icon">&#128179;</span><span style="font-size:12px">'+esc(res.metodo_pago)+'</span>';
        if (res.guesty_id)   h += '<span class="cal-pop-icon">&#128279;</span><span style="font-size:11px;color:#6b7280">Guesty: '+esc(res.guesty_id)+'</span>';
        h += '</div>';

        if (res.early || res.late || (res.servicios && res.servicios.length > 0)) {
            h += '<div class="cal-pop-svcs">';
            if (res.early) h += '<span class="cal-pop-svc" style="background:#eff6ff;color:#1e40af">Early Check-In</span>';
            if (res.late)  h += '<span class="cal-pop-svc" style="background:#fdf4ff;color:#7e22ce">Late Check-Out</span>';
            if (res.servicios) {
                res.servicios.forEach(function(s) {
                    var nombre = typeof s === 'string' ? s : (s.nombre || s);
                    if (nombre !== 'Early Check In' && nombre !== 'Late Check Out') {
                        h += '<span class="cal-pop-svc" style="background:#f0fdf4;color:#166534">'+esc(nombre)+'</span>';
                    }
                });
            }
            h += '</div>';
        }

        h += '<div class="cal-pop-actions">';
        h += '<a href="/reservacion/'+res.id+'" class="cal-btn">Ver Detalle</a>';
        h += '<a href="/backend/roll/reservaciones/reservaciones" class="cal-btn cal-btn--primary">Cambiar Fechas</a>';
        h += '</div>';

        h += '</div>';

        var pop = el('elPop');
        pop.innerHTML = h;
        pop.style.left = px + 'px';
        pop.style.top  = py + 'px';
        pop.style.display = 'block';
        el('elOverlay').style.display = 'block';
    }

    function closePop() {
        el('elPop').style.display = 'none';
        el('elOverlay').style.display = 'none';
    }

    // ══════════════════════════════════════════
    //  DRAG TO SCROLL
    // ══════════════════════════════════════════
    function initDrag() {
        var container = el('elContainer');
        if (!container) return;

        var isDragging = false;
        var startX, startY, scrollLeft, scrollTop;

        container.addEventListener('mousedown', function(e) {
            var tag = e.target.tagName;
            if (tag === 'BUTTON' || tag === 'SELECT' || tag === 'A' || tag === 'INPUT') return;
            if (e.target.closest('.cal-bar') || e.target.closest('.cal-srow')) return;

            isDragging = true;
            container.classList.add('is-dragging');
            startX = e.clientX;
            startY = e.clientY;
            scrollLeft = container.scrollLeft;
            scrollTop  = container.scrollTop;
            e.preventDefault();
        });

        document.addEventListener('mouseup', function() {
            if (!isDragging) return;
            isDragging = false;
            container.classList.remove('is-dragging');
        });

        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            e.preventDefault();
            var dx = e.clientX - startX;
            var dy = e.clientY - startY;
            container.scrollLeft = scrollLeft - dx;
            container.scrollTop  = scrollTop  - dy;
        });
    }

    // ══════════════════════════════════════════
    //  API PÚBLICA
    // ══════════════════════════════════════════
    window.Cal = {
        nav: function(dir) {
            S.vStart = addD(S.vStart, dir * 7);
            fetchData();
        },
        goToday: function() {
            S.vStart = addD(S.today, -3);
            fetchData();
        },
        toggle: function(ubiId) {
            S.expanded[ubiId] = !S.expanded[ubiId];
            renderAll();
        },
        expandAll: function() {
            if (!S.data || !S.data.ubicaciones) return;
            S.data.ubicaciones.forEach(function(u) { S.expanded[u.id] = true; });
            renderAll();
            el('btnExpand').classList.add('active');
            el('btnCollapse').classList.remove('active');
        },
        collapseAll: function() {
            if (!S.data || !S.data.ubicaciones) return;
            S.data.ubicaciones.forEach(function(u) { S.expanded[u.id] = false; });
            renderAll();
            el('btnCollapse').classList.add('active');
            el('btnExpand').classList.remove('active');
        },
        filterUbi: function(val) {
            S.ubiFilter = val;
            S.expanded = {};
            S.firstLoad = true;
            fetchData();
        },
        popup: openPopup,
        closePop: closePop,
        refresh: function() { fetchData(); }
    };

    // ══════════════════════════════════════════
    //  KEYBOARD
    // ══════════════════════════════════════════
    document.addEventListener('keydown', function(e) {
        var tag = document.activeElement.tagName;
        if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
        if (e.key === 'ArrowLeft')  { e.preventDefault(); Cal.nav(-1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); Cal.nav(1); }
        if (e.key === 'Escape')     Cal.closePop();
    });

    // ══════════════════════════════════════════
    //  INIT
    // ══════════════════════════════════════════
    function init() {
        initDrag();
        fetchData();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
