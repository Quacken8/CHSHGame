<script lang="ts">
	import Status from './Status.svelte';
	import LeaveSession from './LeaveSession.svelte';
</script>

<div class="centering">
<p>Ahoj</p>
</div>

<div class="footer">
	<div class="footer-item">
		<Status />
	</div>
	<div class="footer-item">
		<LeaveSession />
	</div>
</div>

<style>
	.footer {
		display: flex;
	}
	.footer-item {
		margin: 5px;
        
	}
</style>
